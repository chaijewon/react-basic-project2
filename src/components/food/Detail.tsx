import {useState, useEffect, Fragment, use} from "react";
import {useNavigate,useParams} from "react-router-dom";
import apiClient from "../commons/http-commons"
import KakaoMap from "../commons/KakaoMap";
/*
    NO                                        NOT NULL NUMBER
    NAME                                               VARCHAR2(100)
    TYPE                                               VARCHAR2(100)
    PHONE                                              VARCHAR2(30)
    ADDRESS                                            VARCHAR2(260)
    SCORE                                              NUMBER(2,1)
    PARKING                                            VARCHAR2(200)
    POSTER                                             VARCHAR2(260)
    TIME                                               VARCHAR2(50)
    CONTENT                                            CLOB
    THEME                                              VARCHAR2(4000)
    PRICE                                              VARCHAR2(100)
    LIKECOUNT                                          NUMBER
    JJIMCOUNT                                          NUMBER
    HIT                                                NUMBER
    REPLYCOUNT
 */
interface FoodDetailData{
   no:number;
   name:string;
   type:number;
   address:string;
   phone:string;
   theme:string;
   price:string;
   time:string;
   parking:string;
   poster:string;
   content:string;
   hit:number;
   jjimcount:number;
   replycount:number;
   likecount:number;
   score:number;
}
function Detail() {
    const {no} =useParams<{no:string}>() // request.getParameter("no")
    const nav=useNavigate()
    const [detail,setDetail]=useState<FoodDetailData|null>(null)
    //const btnClick=nav(-1)
    useEffect(()=>{
        const fetchDetail=async()=>{
            const res=
                     await apiClient.get(`/food/detail_react/${no}`)
            console.log(res)
            setDetail(res.data)
            return res.data
        }
        fetchDetail()
    },[])
    return (
        <div className={"container"}>
            <div className={"row"}>
                <table className="table">
                    <tbody>
                     <tr>
                         <td width={"30%"} rowSpan={8} className={"text-center"}>
                             <img src={detail?.poster} style={{"width":'320px',"height":"320px"}} />
                         </td>
                         <td colSpan={2}>
                            <h3>{detail?.name}&nbsp;<span style={{"color":"orange"}}>{detail?.score}</span></h3>
                         </td>
                     </tr>
                    <tr>
                        <td className={"text-center"} width={"10%"}>주소</td>
                        <td width={"60%"}>{detail?.address}</td>
                    </tr>
                     <tr>
                         <td className={"text-center"} width={"10%"}>전화</td>
                         <td width={"60%"}>{detail?.phone}</td>
                     </tr>
                     <tr>
                         <td className={"text-center"} width={"10%"}>음식종류</td>
                         <td width={"60%"}>{detail?.type}</td>
                     </tr>
                     <tr>
                         <td className={"text-center"} width={"10%"}>주차</td>
                         <td width={"60%"}>{detail?.parking}</td>
                     </tr>
                     <tr>
                         <td className={"text-center"} width={"10%"}>영업시간</td>
                         <td width={"60%"}>{detail?.time}</td>
                     </tr>
                     <tr>
                         <td className={"text-center"} width={"10%"}>가격대</td>
                         <td width={"60%"}>{detail?.price}</td>
                     </tr>
                     <tr>
                         <td className={"text-center"} width={"10%"}>테마</td>
                         <td width={"60%"}>{detail?.theme}</td>
                     </tr>
                    <tr>
                        <td colSpan={3}>{detail?.content}</td>
                    </tr>
                    <tr>
                        <td colSpan={3} className={"text-right"}>
                            <button className={"btn btn-danger"}
                                    onClick={()=>nav(-1)}>목록</button>
                        </td>
                    </tr>
                    <tr>
                        <td colSpan={3}>
                            {
                                detail &&
                                <KakaoMap address={detail?.address} name={detail?.name}/>
                            }
                        </td>
                    </tr>
                    </tbody>
                </table>
            </div>
        </div>
    )
}
export default Detail;