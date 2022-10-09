import { Checkbox } from "@chakra-ui/react"
import { ChangeEvent } from "react"


export const CurrentTimeZoneSelector = ({currentSelected ,onChange}:{currentSelected:boolean ,onChange:(event: ChangeEvent<HTMLInputElement>)=> void}) => {  (
        <Checkbox data-testid="current-timezone-selector" defaultChecked={currentSelected} onChange={onChange}/>
    )
}

export default CurrentTimeZoneSelector;