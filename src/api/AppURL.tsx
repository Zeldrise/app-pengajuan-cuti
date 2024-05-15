class AppURL {
  static BaseURL = 'http://192.168.10.26:3000'

  static UserLogin = `${AppURL.BaseURL}/auth/login`
  static Users = `${AppURL.BaseURL}/users`
  static Profile = `${AppURL.Users}/profil`
  static LeaveType = `${AppURL.BaseURL}/leave-types`
  static Submissions = `${AppURL.BaseURL}/submissions`
}

export default AppURL
