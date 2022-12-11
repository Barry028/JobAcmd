// Place fonts/JobAcmd.ttf in your fonts/ directory and
// add the following to your pubspec.yaml
// flutter:
//   fonts:
//    - family: JobAcmd
//      fonts:
//       - asset: fonts/JobAcmd.ttf
import 'package:flutter/widgets.dart';

class JobAcmd {
  JobAcmd._();

  static const String _fontFamily = 'JobAcmd';

  static const IconData font_big = IconData(0xe900, fontFamily: _fontFamily);
  static const IconData font_default = IconData(0xe901, fontFamily: _fontFamily);
  static const IconData font_small = IconData(0xe902, fontFamily: _fontFamily);
  static const IconData clock = IconData(0xe903, fontFamily: _fontFamily);
  static const IconData phone = IconData(0xe904, fontFamily: _fontFamily);
}
