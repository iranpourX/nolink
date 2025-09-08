import {urlValid} from "./helper"

export const url = {
    required: 'مقدار خالی است',
    pattern: {
        value: urlValid,
        message: 'link not valid'
    }
}