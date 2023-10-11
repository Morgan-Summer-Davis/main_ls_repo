function compareVersions(version1, version2) {
  if (/([^0-9\.]|\.\.|^\.|\.$)/.test(version1 + version2)) return null;

  version1 = formatVersion(version1);
  version2 = formatVersion(version2);

  for (let index = 0; index < Math.max(version1.length, version2.length);
       index += 1) {
    if      ((version1[index] || 0) > (version2[index] || 0)) return 1;
    else if ((version1[index] || 0) < (version2[index] || 0)) return -1;
  }

  return 0;
}

function formatVersion(version) {
  return String(version).replace(/(.0)+$/, '').split('.').map(num => parseInt(num, 10));
}

console.log(compareVersions('1.1', '1.0.0'));
console.log(compareVersions('1.1', '1.2.0'));
console.log(compareVersions('1.0.0', '1.0'));
console.log(compareVersions('1.0.0e', '1.0'));
console.log(compareVersions('1.0.0', '1..0'));
console.log(compareVersions('.1.0.0', '1.0'));
console.log(compareVersions('1.0.0', '1.0.'));
console.log(compareVersions('0', ''));
console.log(compareVersions('', ''));
console.log(compareVersions('', '0.1'));
console.log(compareVersions('3', null));
console.log(compareVersions());
console.log(compareVersions(3));
console.log(compareVersions(3, 6.3));
console.log(compareVersions(3, NaN));