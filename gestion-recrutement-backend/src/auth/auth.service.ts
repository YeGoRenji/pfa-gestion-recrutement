import { Injectable } from "@nestjs/common";

@Injectable({})
export class AuthService {
    signin() {
        return {msg: "Signed in ? TODO"}
    }
    signup() {
        return {msg: "Signed up ? TODO"}
    }
}