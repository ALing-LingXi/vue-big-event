import { dayjs } from "element-plus";

export const format = (time)=>dayjs(time).format('YYYY年MM月DD日')
