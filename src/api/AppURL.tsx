

class AppURL {
  static BaseURL = process.env.NEXT_PUBLIC_BASE_URL

  static UserLogin = `${AppURL.BaseURL}/auth/login`
  static UserChangePass = `${AppURL.BaseURL}/auth/changePassword`
  static Users = `${AppURL.BaseURL}/users`
  static Profile = `${AppURL.Users}/profil`
  static LeaveType = `${AppURL.BaseURL}/leave-types`
  static Submissions = `${AppURL.BaseURL}/submissions`
  static SubLogin = `${AppURL.Submissions}/login`
}

export default AppURL
