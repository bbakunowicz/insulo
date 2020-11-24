const getSettingVisibility = (visibilityValues, setting) => {
  if (typeof setting.visibleParams == 'object' && setting.visibleParams.persistentEnabled) {
    if (typeof visibilityValues === 'object' && visibilityValues.persistentEnabled === true ){
      return true;
    }
    return false;
  }
  return true;
}

export default getSettingVisibility;