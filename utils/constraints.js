export const constraints = {
  email: {
    presence: {
      allowEmpty: false,
      message: "^Please enter an email address"
    },
    email: {
      message: "^Please enter a valid email address"
    }
  },
  password: {
    presence: {
      allowEmpty: false,
      message: '^Please enter a password',
    },
    length: {
      minimum: 8,
      message: '^Your password must be at least 8 characters',
    },
  },
  confirmPassword: {
    presence: {
      allowEmpty: false,
      message: '^Please enter a confirm password',
    },
    equality: {
      attribute: "password",
      message: "^Your confirmation password does not match your password",
    }
  },
};

export default constraints;