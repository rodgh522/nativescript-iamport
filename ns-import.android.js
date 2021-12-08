import { Application } from '@nativescript/core';
import { Common } from 'nativescript-ns-import/ns-import.common';

export class NsImport extends Common {

  constructor(){
    super();
  }

  makeIntent(url) {
    const intent = this.parse(url);
    const context = Application.android.foregroundActivity;
    try {
      this.start(intent, context);
      // if (this.isExistInfo(intent, context) || this.isExistPackage(intent, context)) {
      // } else {
      //   this.gotoMarket(intent, context);
      // }
    } catch(e) {
      this.gotoMarket(intent, context);
    }
  }

  parse(url) {
    const Intent = android.content.Intent;
    try {
      return Intent.parseUri(url, Intent.URI_INTENT_SCHEME);
    } catch (e) {
      console.error('[Error]=> parse : ', e);
      return null;
    }
  }

  isExistInfo(intent, context) {
    try {
      return intent != null && context.getPackageManager().getPackageInfo(intent.getPackage(), 	android.content.pm.PackageManager.GET_ACTIVITIES) != null;
    } catch (e) {
      console.error('[Error]=> isExistInfo : ', e);
      return false;
    }
  }

  isExistPackage(intent, context) {
    try{
      return intent != null && context.getPackageManager().getLaunchIntentForPackage(intent.getPackage()) != null;
    } catch(e) {
      console.error('[Error]=> is exist package : ', e);
      return false;
    }
  }

  start(intent, context) {
    context.startActivity(intent);
  }

  gotoMarket(intent, context) {
    const Intent = android.content.Intent;
    try{
      context.startActivity(new Intent(Intent.ACTION_VIEW, android.net.Uri.parse("market://details?id=" + intent.getPackage())));
    } catch(e) {
      console.error('[Error]=> go to marget : ', e);
    }
  }

}