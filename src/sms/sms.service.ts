import { Injectable } from '@nestjs/common';
import axios from 'axios';

@Injectable()
export class SmsService {
    private readonly baseUrl = 'http://notify.eskiz.uz/api';
    private readonly email = 'abdurasulovbunyod56@gmail.com'
    private readonly password = 'HDAIOgYPY7t9NR80917o3g9yxR1soa8B1R'
    private token: string|null = ''

    async authenticate(){
        try {
            let {data} = await axios.post(`${this.baseUrl}/auth/login`, {
                email: this.email,
                password: this.password
            })
            this.token = data?.data?.token
        } catch (error) {
            return error
        }
    }

    async ensureAuthenticate(){
        if(!this.token){
            await this.authenticate()
        }
    }

    async sendSms(phone: string, message: string){
        await this.ensureAuthenticate()
        try {
            let {data} = await axios.post(`${this.baseUrl}`, {
                phone,
                message: 'Bu Eskizdan test',
                from: '4546',

            },
        {
            headers: {
                'Authorization': `Bearer ${this.token}`
            }
        })
            console.log('Successfully sent');
            
            return data
        } catch (error) {
            this.token = null
            console.log(error);
            
            await this.sendSms(phone, message)
        }
    }
}
