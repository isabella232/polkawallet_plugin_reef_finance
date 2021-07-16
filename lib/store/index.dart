import 'package:polkawallet_plugin_reef_finance/store/accounts.dart';
import 'package:polkawallet_plugin_reef_finance/store/cache/storeCache.dart';
import 'package:polkawallet_plugin_reef_finance/store/gov/governance.dart';
import 'package:polkawallet_plugin_reef_finance/store/staking/staking.dart';

class PluginStore {
  PluginStore(StoreCache cache)
      : staking = StakingStore(cache),
        gov = GovernanceStore(cache);
  final StakingStore staking;
  final GovernanceStore gov;
  final AccountsStore accounts = AccountsStore();
}
