export const validateRegisterInput = (
  name: string,
  profilePhoto: Express.Multer.File,
  username: string,
  email: string,
  password: string,
  confirmPassword: string
) => {
  const errors: any = {};

  if (name.trim() === "") {
    errors.name = "O campo nome precisa ser preenchido";
  }

  if (!profilePhoto) {
    errors.profilePhoto = "É preciso inserir uma foto";
  }

  if (username.trim() === "") {
    errors.username = "O campo usuário precisa ser preenchido";
  }

  if (email.trim() === "") {
    errors.email = "O campo email precisa ser preenchido";
  } else {
    const regEx = /^([0-9a-zA-Z]([-.\w]*[0-9a-zA-Z])*@([0-9a-zA-Z][-\w]*[0-9a-zA-Z]\.)+[a-zA-Z]{2,9})$/;
    if (!email.match(regEx)) {
      errors.email = "O campo email deve ser um endereço de email válido";
    }
  }

  if (password === "") {
    errors.password = "O campo senha precisa ser preenchida";
  } else if (password !== confirmPassword) {
    errors.confirmPassword = "As senhas não coincidem";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};

export const validateLoginInput = (username: string, password: string) => {
  const errors: any = {};

  if (username.trim() === "") {
    errors.username = "O campo usuário precisa ser preenchido";
  }

  if (password === "") {
    errors.password = "O campo senha precisa ser preenchida";
  }

  return {
    errors,
    valid: Object.keys(errors).length < 1,
  };
};
