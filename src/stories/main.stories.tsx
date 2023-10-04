import { Main } from "../components/main/main"
import {MainStoreDecorators} from "./MainStoreDecorators";


export default {
    title: "main component",
    component: <Main/>,
    decorators: [MainStoreDecorators]
}

export const MainExample = () => {
    return <Main/>
}