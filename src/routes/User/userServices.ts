import { User } from "../../models/User";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { LoginBody, RegisterBody } from "../../interfaces/users";


export default class UserServices {
  static async Register(body: RegisterBody){
    const { name, email, password } = body;

      const existingUser = await User.findOne({
        raw: true,
        where: { email: email },
      });

      if (existingUser) {
        throw new Error(
          "O e-mail fornecido já está associado a um usuário cadastrado"
        );
      }

      const hashPassword = bcrypt.hashSync(password, 1);

      const registerData = {
        name,
        email,
        password: hashPassword,
      };

      await User.create(registerData);

      return { message: "Usuário cadastrado com sucesso!" };
  }

  static async Login(body: LoginBody) {
    const { email, password } = body;

    const currentUser = await User.findOne({
      raw: true,
      where: { email: email },
    });

    if (!currentUser) {
      throw new Error("Usuário não encontrado.");
    }

    let verifyPassword;
    if (currentUser.password) {
      verifyPassword = bcrypt.compareSync(password, currentUser.password);
    }

    if (!verifyPassword) {
      throw new Error("Sua senha está incorreta.");
    }

    const token = jwt.sign(
      {
        id: currentUser.id,
      },
      process.env.JWT_SECRET as string,
      { expiresIn: "12h" }
    );

    const userData = {
      name: currentUser.name,
      email: currentUser.email,
      createdAt: currentUser.createdAt,
      updatedAt: currentUser.updatedAt,
    };

    return {
      message: "Login realizado com sucesso!",
      data: {
        user: userData,
        token: token,
      },
    };
  }
}
