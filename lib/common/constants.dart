import 'package:flutter/material.dart';

const int SECONDS_OF_DAY = 24 * 60 * 60; // seconds of one day
const int SECONDS_OF_YEAR = 365 * 24 * 60 * 60; // seconds of one year

const node_list_reef = [
  {
    'name': 'Reef Chain',
    'ss58': 42,
    'endpoint': 'wss://rpc.reefscan.com/ws',
  }
];
const node_list_reef_testnet = [
  {
    'name': 'Reef Test Node1',
    'ss58': 42,
    'endpoint': 'wss://rpc-testnet.reefscan.com/ws',
  }
];

const home_nav_items = ['staking']; //, 'governance'];

const MaterialColor reef_purple = const MaterialColor(
  0xFF681cff,
  const <int, Color>{
    50: const Color(0xFFdacbf9),
    100: const Color(0xFFcab4f7),
    200: const Color(0xFFcab4f7),
    300: const Color(0xFFb798f7),
    400: const Color(0xFFb798f7),
    500: const Color(0xFF9565f7),
    600: const Color(0xFF7f46f4),
    700: const Color(0xFF7f46f4),
    800: const Color(0xFF5406f4),
    900: const Color(0xFF5406f4),
  },
);

const genesis_hash_reef =
    '0x7834781d38e4798d548e34ec947d19deea29df148a7bf32484b7b24dacf8d4b7';
const genesis_hash_reef_testnet =
    '0x0f89efd7bf650f2d521afef7456ed98dff138f54b5b7915cc9bce437ab728660';
const String network_name_reef = 'reef';
