//전역 데이터 받아오기
import { MapsContext, useContext } from ".";

export default  () =>{

    const { L, useMap, position, setposition}  = useContext(MapsContext)

  if (!position) {
    return;
  }

    const map = useMap();
    console.log(position)
    map.setView(position, 6);

}