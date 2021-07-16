import 'dart:math';
class HexUtil{
  static double toDouble (String hex) {
    if(hex.toUpperCase().startsWith('0X')){
      hex = hex.substring(2, hex.length);
    }
    BigInt hexInt=BigInt.parse(hex, radix: 16);
    return hexInt.toDouble()/pow(10, 18);
  }
}
