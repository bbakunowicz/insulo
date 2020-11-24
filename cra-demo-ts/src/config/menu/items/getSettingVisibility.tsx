const getSettingVisibility = (visibilityValues: {persistentEnabled: boolean}, setting: {visibleParams?:{persistentEnabled: boolean}}) => {
  if (typeof setting.visibleParams == 'object' && setting.visibleParams.persistentEnabled) {
    if (typeof visibilityValues === 'object' && visibilityValues.persistentEnabled === true ){
      return true;
    }
    return false;
  }
  return true;
}

export default getSettingVisibility;