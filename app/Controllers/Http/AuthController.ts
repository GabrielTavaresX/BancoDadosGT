import type { HttpContextContract } from '@ioc:Adonis/Core/HttpContext'
import User from '../../Models/GagaTata'
import RegisterUserValidator from "../../Validators/RegisterUserValidator";

export default class AuthController {

    public async register({ request }: HttpContextContract) {
        const data = await request.validate(RegisterUserValidator)
        const user = await User.create(data)
        return user
    }

    public async login({ request, auth, response}: HttpContextContract) {
        try {
            const { email, password } = request.all()
            const token = await auth.use('api').attempt(email, password, {
                expiresIn: '1day'
            })
            const user = await User.findByOrFail("email", email)
            return {token, user}
        } catch (error) {
            response.status(401).send("Login ou senha incorreta")
        }
    }
}


//o q é o .env
//é o ambiente onde a aplicação ta rodando, o local
//ele n sobe pra n manda as informações de seu login e senha
//.env.example é só um exemplo para saber oq precisa configurar,
//para nao deixar um acesso ao seu servidor


