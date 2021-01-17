const getSettingVisibility = (visibilityValues: {persistentEnabled: boolean}, setting: {authProps?:{persistentEnabled: boolean}}):boolean => {
  if (typeof setting.authProps == 'object' && setting.authProps.persistentEnabled) {
    if (typeof visibilityValues === 'object' && visibilityValues.persistentEnabled === true ){
      return true;
    }
    return false;
  }
  return true;
}

export default getSettingVisibility;