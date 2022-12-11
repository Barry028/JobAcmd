/**
 * @author https://github.com/funnyque/fileUpload.js; WeChat:qqyun686
 * @version V3.0.1
 * @description 一款簡單易用的H5/Web文件上傳插件，支持樣式自定義，支持數據可配置，支持多實例上傳...
 */
;(function (window, document) {
    var defaultConfigs = {
        easyId: '', //插件插入節點的Id，String類型
        accept: '.jpg,.png,.pdf',
        action: '', //上傳文件地址，String類型
        btnText: {  //按鈕展示文字
            select: '<i class="tu-file-plus"></i> 選擇文件',
            upload: '<i class="tu-upload"></i> 上傳檔案',
            delete: '<i class="tu-trash-2"></i> 刪除',
            cancel: '<i class="tu-minus-circle"></i> 終止'
        },
        maxCount: 1, //插件單次添加文件的最大數量，Number類型
        maxSize: 5, //允許上傳文件的最大體積，單位M，Number類型
        multiple: true, //是否開啟多文件上傳，Boolean類型
        messageTime: 2000, //messageBox消息提示毫秒數，Number類型
        responseType: 'text', //xhr的responseType格式，String類型
        showSize: true, //是否展示文件體積，Boolean類型
        showLoading: false, //是否展示上傳loading動畫，Boolean類型
        statusText: {  //不同狀態展示的提示文字，key為對應文件狀態(不可修改)，value為展示文字
            0: '允許上傳', //文件大小驗證合格後的初始狀態
            1: '即將上傳', //等待上傳隊列執行到自己時的狀態
            2: '0%',      //上傳時剛發出xhr還沒響應時的狀態
            3: '上傳成功',  //xhr響應&上傳成功時的狀態
            4: '上傳失敗',  //xhr響應&上傳失敗時的狀態
            5: '體積超出',  //檢測文件大小超出限定值時的狀態
        },
        statusTextColor: {  //不同狀態'提示文字'標簽的className，key為對應文件狀態(不可修改)，value為標簽的className
            0: 'normalcolor',  //正常狀態字體色的className
            1: 'normalcolor',  //正常狀態字體色的className
            2: 'normalcolor',  //正常狀態字體色的className
            3: 'normalcolor',  //正常狀態字體色的className
            4: 'failedcolor',  //失敗狀態字體色的className
            5: 'warncolor',    //警告狀態字體色的className
        },
        statusBg: {  //不同狀態對應標簽的className，key為對應文件狀態(不可修改)，value為標簽的className
            0: 'normalbg',  //正常狀態背景色的className
            1: 'normalbg',  //正常狀態背景色的className
            2: 'normalbg',  //正常狀態背景色的className
            3: 'normalbg',  //正常狀態背景色的className
            4: 'failedbg',  //失敗狀態背景色的className
            5: 'warnbg',    //警告狀態背景色的className
        },
        timeout: 0, //請求超時毫秒數，0表示永久，Number類型
        withCredentials: true, //是否允許請求頭自帶cookie等證書，Boolean類型
        setRequestHeader: null, //配置xhr請求頭的方法
        buildSendData: null, //配置xhr發送數據格式的方法，返回data
        checkSuccessCode: null, //檢查成功狀態碼的方法，返回布爾值，默認返回true
        uploadStart: null, //每個文件隊列上傳前的回調函數，傳入參數'self'是當前fileUpload實例，可通過self.files查看隊列文件
        uploadEnd: null //每個文件隊列上傳完成後的回調函數，傳入參數'self'是當前fileUpload實例，可通過self.files查看隊列文件
    };
    function FileUpload(configs) {
        var self = this instanceof FileUpload ? this : Object.create(FileUpload.prototype);
        self.configs = Object.assign({}, defaultConfigs, configs);
        self.files = [];
        self.fileId = 0;
        self.xhrFiles = [],
        self.isXhrReady = true,
        self.xhr = new XMLHttpRequest();
        render(self);
        return self;
    }
    FileUpload.prototype = { constouctor: FileUpload }; //重新指定constouctor
    function render(self) {
        var easyTemplate = 
            '<span class="message-box">訊息放這訊息放這</span>' +
            (self.configs.showLoading ?
            '<div class="loading">' +
                '<div class="loading-icon"></div>' +
                '<div class="loading-mask"></div>' +
            '</div>' : '') +
            '<input type="file" name="file" class="input-file"'+ (self.configs.multiple ? 'multiple': '') +' accept="'+ self.configs.accept +'">' +
            '<div class="btn-list">' +
                '<div btntype="select" class="btn btn--border--primary">'+ self.configs.btnText.select +'</div>' +
                '<div btntype="upload" class="btn btn--primary">'+ self.configs.btnText.upload +'</div>' +
                '<div btntype="delete" class="btn btn--border--danger">'+ self.configs.btnText.delete +'</div>' +
                '<div btntype="cancel" class="btn btn--border--danger">'+ self.configs.btnText.cancel +'</div>' +
                '<div btntype="checkall" class="checkbox unchecked hide"></div>' +
            '</div>' +
            '<ul class="file-list">' +
            '</ul>';
        document.getElementById(self.configs.easyId).innerHTML = easyTemplate;
        bindBtnList(self);
        bindInputFile(self);
    }

    function renderList(self) {
        var listTemplate = '';
        for (var i = 0; i < self.files.length; i++) {
            listTemplate +=
                '<li class="file-list-item fadeIn" fileid="' + self.files[i].id + '">' +
                '   <div class="preview">' +
                    (/image\//.test(self.files[i].type) ? '<img class="preview-img"' + ' src="' + self.files[i].base64 + '" alt="' + self.files[i].name + '">' : '<div class="preview-div"></div>') +
                '   </div>' +
                '   <div class="btn-file">' +
                '       <div btntype="delone" class="btn-file-del" fileid="' + self.files[i].id + '">' +
                '           <span btntype="delone" class="btn-file-del-text" fileid="' + self.files[i].id + '"></span>' +
                '       </div>' +
                '       <div btntype="checkone" class="btn-file-checkbox checkbox ' + (self.files[i].isChecked ? 'checked' : 'unchecked') + '" fileid="' + self.files[i].id + '"></div>' +
                '   </div>' +
                '   <div class="fileinfo">' +
                '       <p class="fileinfo-text">' +
                '           <span class="fileinfo-text-name">' + (self.configs.showSize ? '<i class="fileinfo-text-size ' + matchFileSizeBg(self, self.files[i]) + '">' + bytesToSize(self.files[i].size) + '</i>' : '') + self.files[i].name + '</span>' +
                '           <span class="fileinfo-text-status ' + self.configs.statusTextColor[self.files[i].status] + '" fileid="' + self.files[i].id + '">' + self.configs.statusText[self.files[i].status] + '</span>' +
                '       </p>' +
                '       <div class="fileinfo-progress">' +
                '           <div class="fileinfo-progress-bar ' + self.configs.statusBg[self.files[i].status] + '" style="width:' + self.files[i].progress + ';" fileid="' + self.files[i].id + '"></div>' +
                '       </div>' +
                '       <div class="fileinfo-input">'+
                '           <input type="text" placeholder="請輸入檔案備註" size="16" class="form-normal" value="">'+
                '       </div>' +
                '   </div>' +
                '</li>';
        }
        document.getElementById(self.configs.easyId).querySelector('.file-list').innerHTML = listTemplate;

        bindFileList(self);
    }


    function bindBtnList(self) {
        var fileUpload = document.getElementById(self.configs.easyId);
        fileUpload.querySelector('.btn-list').onclick = function (evt) {
            var evt = evt || window.event,
                target = evt.target || evt.srcElement,
                btntype = target.getAttribute('btntype');
            switch (btntype) {
                case 'select':
                    selectFiles(self);
                    // if (btntype === 'checkall') {
                    //         this.removeClass('hide')
                    //     }
                    break;
                case 'upload':
                    uploadFiles(self);
                    break;
                case 'delete':
                    delFiles(self);
                    checkAll(self, 'delete');
                    renderList(self);
                    break;
                case 'cancel':
                    cancelUpload(self);
                    break;
                case 'checkall':
                    checkAll(self, 'click');
                    checkList(self);
                    break;
            }
        }
    }


    function bindInputFile(self) {
        var inputFile = document.getElementById(self.configs.easyId).querySelector('.input-file');
        inputFile.addEventListener('change', function () {
            var i = 0,
                _this = this;
            function pushFile(obj) {
                if (self.files.length < self.configs.maxCount) {
                    self.files.push(obj);
                    self.fileId++;
                } else {
                    showMessage(self, {
                        text: '文件數量超出',
                        class_name: self.configs.statusBg[5]
                    })
                }
            }
            function buildFile() {
                if (i < _this.files.length) {
                    var obj = {
                        id: self.fileId,
                        name: _this.files[i].name,
                        size: _this.files[i].size,
                        type: _this.files[i].type,
                        isChecked: false,
                        status: 0,
                        progress: '0%',
                        file: _this.files[i]
                    };
                    if (/image\//.test(_this.files[i].type)) {
                        readImg(_this.files[i], function (base64) {
                            obj.base64 = base64;
                            pushFile(obj);
                            i++;
                            buildFile();
                        });
                    } else {
                        pushFile(obj);
                        i++;
                        buildFile();
                    }
                } else {
                    checkAll(self);
                    renderList(self);
                    _this.value = [];
                }
            }
            buildFile();
        });
    }


    function bindFileList(self) {
        var fileUpload = document.getElementById(self.configs.easyId);
        fileUpload.querySelector('.file-list').onclick = function (evt) {
            var evt = evt || window.event,
                target = evt.target || evt.srcElement,
                fileId = target.getAttribute('fileid'),
                btntype = target.getAttribute('btntype');
            switch (btntype) {
                case 'checkone':
                    checkFileById(self, fileId);
                    checkAll(self);
                    checkList(self, fileId);
                    break;
                case 'delone':
                    delFiles(self, fileId);
                    checkAll(self);
                    renderList(self);
                    break;
            }
        }
    }


    function selectFiles(self) {
        document.getElementById(self.configs.easyId).querySelector('.input-file').click();
    }


    function delFiles(self, fileId) {
        if (self.files.length && !getCheckedCount(self) && fileId==undefined) {
            showMessage(self, {
                text: '未選中文件',
                class_name: self.configs.statusBg[5]
            })
            return;
        }


        var newFiles = [];
        for (var i = 0; i < self.files.length; i++) {
            if (fileId && self.files[i].id != fileId) newFiles.push(self.files[i]);
            if (!fileId && !self.files[i].isChecked) newFiles.push(self.files[i]);
        }
        self.files = newFiles;
    }
    function cancelUpload(self) {
        self.xhr.onabort = function () {
            showMessage(self, {
                text: '成功取消上傳',
                class_name: self.configs.statusBg[3]
            })
        }
        self.xhr.abort();
    }
    function checkAll(self, evtType) {
        var allBox = document.getElementById(self.configs.easyId).querySelector('.btn-list').querySelector('.checkbox');
        if (!self.files.length) {
            if (evtType == 'delete') return;
            if (/\sunchecked$/.test(allBox.className)) {
                setCheckBox(allBox, true);
                return;
            }
            if (/\schecked$/.test(allBox.className)) {
                setCheckBox(allBox, false);
                return;
            }
        } else {
            var isAllChecked = getCheckedCount(self) == self.files.length;
            if (evtType == 'click') {
                setCheckBox(allBox, !isAllChecked);
                setCheckedFile(self, (isAllChecked ? false : true));
            } else {
                setCheckBox(allBox, isAllChecked);
            }
        }
    }


    function checkList(self, fileId) {
        var fileUpload = document.getElementById(self.configs.easyId);
        if (fileId) {
            var file = getFileById(self, fileId),
                checkbox = fileUpload.querySelector('[fileid="' + fileId + '"]').querySelector('.checkbox');
            setCheckBox(checkbox, file.isChecked);
        } else {
            var isChecked = getCheckedCount(self) == self.files.length,
                fileList = fileUpload.querySelectorAll('.file-list-item');
            for (var i = 0; i < fileList.length; i++) {
                setCheckBox(fileList[i].querySelector('.checkbox'), isChecked);
            }
        }
    }
    function matchFileSizeBg(self, file) {
        var fileSize = (file.size / Math.pow(1024, 2)).toFixed(2);
        if (self.configs.maxSize > fileSize) {
            return self.configs.statusBg[0];
        } else {
            file.status = 5;
            return self.configs.statusBg[5];
        }
    }
    function getCheckedCount(self) {
        var count = 0;
        for (var i = 0; i < self.files.length; i++) {
            if (self.files[i].isChecked) count++;
        }
        return count;
    }
    function getFileById(self, id) {
        for (var i = 0; i < self.files.length; i++) {
            if (self.files[i].id == id) return self.files[i];
        }
    }
    function checkFileById(self, fileId) {
        for (var i = 0; i < self.files.length; i++) {
            if (self.files[i].id == fileId) {
                self.files[i].isChecked = !self.files[i].isChecked;
            }
        }
    }
    function bytesToSize(bytes) {
        if (bytes === 0) return '0 B';
        var k = 1024,
        sizes = ['B', 'KB', 'MB', 'GB', 'TB', 'PB', 'EB', 'ZB', 'YB'],
        i = Math.floor(Math.log(bytes) / Math.log(k));
        return (bytes / Math.pow(k, i)).toPrecision(3) + ' ' + sizes[i];
    }

    function setStatus(self) {
        var fileList = document.getElementById(self.configs.easyId).querySelectorAll('.file-list-item');
        for (var i = 0; i < fileList.length; i++) {
            var id = fileList[i].getAttribute('fileid'),
                tag = fileList[i].querySelector('.fileinfo-text-status');
            tag.innerHTML = self.configs.statusText[getFileById(self, id).status]
        }
    }

    function setProgress(self, fileObj) {
        var fileUpload = document.getElementById(self.configs.easyId);
        var tag = fileUpload.querySelector('[fileid="' + fileObj.id + '"]').querySelector('.fileinfo-progress-bar');
        tag.style.width = fileObj.progress;
        tag.className = 'fileinfo-progress-bar ' + self.configs.statusBg[fileObj.status];
    }

    function setStatusColor(self, fileObj) {
        var tags = document.getElementById(self.configs.easyId).querySelectorAll('.fileinfo-text-status');
        for (var i = 0; i < tags.length; i++) {
            if (fileObj.id == tags[i].getAttribute('fileid')) {
                tags[i].className = 'fileinfo-text-status ' + self.configs.statusTextColor[fileObj.status];
            }
        }

    }

    function setCheckedFile(self, isChecked) {
        for (var i = 0; i < self.files.length; i++) {
            self.files[i].isChecked = isChecked;
        }
    }

    function setCheckBox(tag, isChecked) {
        if (isChecked) {
            if (/\sunchecked$/.test(tag.className)) tag.className = tag.className.replace('unchecked', 'checked');
        } else {
            if (/\schecked$/.test(tag.className)) tag.className = tag.className.replace('checked', 'unchecked');
        }
    }
    function readImg(file, cb) {
        var reader = new FileReader();
        reader.onload = function () {
            cb && cb(this.result);
        }
        reader.readAsDataURL(file);
    }

    function showLoading(self, isShow) {
        var tag = document.getElementById(self.configs.easyId).querySelector('.loading');
        tag.style.display = isShow ? 'block' : 'none';
    }
    function showMessage(self, obj) {
        var tag = document.getElementById(self.configs.easyId).querySelector('.message-box');
        tag.className = 'message-box ' + obj.class_name;
        tag.style.display = 'inline-block';
        tag.innerHTML = obj.text;
        setTimeout(function() {
            tag.style.display = 'none';
        }, self.configs.messageTime);
    }
    function uploadFiles(self) {
        for (var j = 0; j < self.files.length; j++) {
            if (self.files[j].isChecked && (self.files[j].status == 4 || self.files[j].status == 0 || self.files[j].status == 3)) {
                self.files[j].status = 1;
                self.files[j].progress = '0%';
                self.xhrFiles.push(self.files[j]);
                setProgress(self, { progress: '0%', id: self.files[j].id, status: self.files[j].status });
            }
        }
        if (!self.xhrFiles.length) {
            if (self.files.length) {
                showMessage(self, {
                    text: '未選中有效文件',
                    class_name: self.configs.statusBg[5]
                })
            }
            return;
        }


        setStatus(self);
        if(self.isXhrReady) {
            var i = 0;
            self.isXhrReady = false;
            self.configs.uploadStart && self.configs.uploadStart(self);
            self.configs.showLoading && showLoading(self, true);
            function upload() {
                self.xhrFiles[i].status = 2;
                setStatus(self);
                self.xhr.open('post', self.configs.action);
                self.xhr.timeout = self.configs.timeout;
                self.xhr.responseType = self.configs.responseType; //響應返回的數據格式 'json' ie10不支持
                self.xhr.withCredentials = self.configs.withCredentials;
                self.configs.setRequestHeader && self.configs.setRequestHeader(self.xhr);
                self.xhr.addEventListener('progress', function(data){
                    var progress = String(((data.loaded/data.total)*100).toFixed(2)) + '%';
                    self.xhrFiles[i].progress = progress;
                    setProgress(self, { progress: progress, id: self.xhrFiles[i].id, status: self.xhrFiles[i].status });
                });
                self.xhr.onreadystatechange = function() {
                    if (self.xhr.readyState == 4) {
                        var fileObj = {
                            progress: self.xhrFiles[i].progress,
                            id: self.xhrFiles[i].id,
                            status: self.xhrFiles[i].status
                        };
                        if (self.xhr.status == 200 && (self.configs.checkSuccessCode == null) || self.configs.checkSuccessCode(self.xhr)) {
                            setStatusColor(self, fileObj);
                            setProgress(self, fileObj);
                            changeStatus(3);
                        } else {
                            setStatusColor(self, fileObj);
                            setProgress(self, fileObj);
                            changeStatus(4);
                        }
                    }
                }
                if (self.configs.buildSendData == null) {
                    self.xhr.send(null);
                } else {
                    self.xhr.send(self.configs.buildSendData(self.xhrFiles[i]));
                }
            }
            upload();
            function changeStatus(status) {
                self.xhrFiles[i].status = status;
                setStatus(self);
                i++;
                self.isXhrReady = true;
                if (i < self.xhrFiles.length) {
                    upload();
                } else {
                    self.xhrFiles = [];
                    i = 0;
                    self.configs.showLoading && showLoading(self, false);
                    self.configs.uploadEnd && self.configs.uploadEnd(self);
                }
            }
        }
    }
    window.fileUpload = FileUpload;
}(window, document));