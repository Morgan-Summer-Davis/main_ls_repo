interface UserInfo {
  name: string;
  email?: string;
  age?: number;
}

function displayUserInfo(userInfo: UserInfo): string {
  return `name: ${userInfo.name}; email: ${userInfo.email || 'N/A'}; ` + 
         `age: ${userInfo.age || 'unknown'}`;
}