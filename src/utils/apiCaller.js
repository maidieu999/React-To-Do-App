import axios from 'axios';
import * as Config from './../constants/Config';

export default function callAPI(endpoint, method = 'GET', body) {
    return axios({
        method: method,
        url: `${Config.API_URL}/${endpoint}`,
        data: body
    })
        //không tạo then để khi nào gọi hàm tạo sau
        // .then(response => {
        //     this.setState({
        //         products: response.data,
        //     })

        // })
        .catch(function (error) {
            console.log(error)
        })
}