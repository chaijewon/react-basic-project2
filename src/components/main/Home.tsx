import {useState,useEffect,Fragment} from "react";
import {Link} from "react-router-dom";
import apiClient from "../commons/http-commons";
interface Food{
    no:number;
    name:string;
    poster:string;
    address:string;
}
interface FoodProps{
    list:Food[];
    curpage:number;
    totalpage:number;
    startPage:number;
    endPage:number;
}
/*
     Home() <Home/>  http://localhost:3000
       |
     mount() => useEffect()
       |
     서버로부터 데이터 읽기
       |
      저장 => state (state에 저장된 데이터만 HTML에 적용)
       |
      return => HTML을 변경해서 index.html
                              <div id="root">|변경된 HTML을 첨부</div>

      이벤트 발생 (마우스 , 버튼)
        |
      setXxx가 호출 되면 => useEffect()를 수행  => 재렌더링
            ==> setState()

 */
function Home() {
    const [curpage, setCurpage] = useState<number>(1);
    const [foodData, setFoodData] = useState<FoodProps>();
    useEffect(()=>{
        const fetchList= async () =>{
            const res=await apiClient.get(`/food/list/${curpage}`)
            console.log(res.data)
            setFoodData(res.data)
            return res.data
        }
        fetchList();
    },[curpage]);
    // 데이터 추출
    const html=foodData?.list.map((food:Food)=>
        <div className="col-md-3">
            <div className="thumbnail">
                <Link to={'/food/detail/'+food.no}>
                    <img src={food.poster} alt={food.address} style={{"width":"250px","height":"150px","objectFit":"cover"}} />
                        <div className="caption">
                            <p>{food.name}</p>
                        </div>
                </Link>
            </div>
        </div>
    )
    // 이벤트
    const prev=()=>foodData && setCurpage(foodData.startPage-1);
    const next=()=>foodData && setCurpage(foodData.endPage+1);
    const pageChange=(page:number)=>foodData && setCurpage(page);
    // 페이지
    const pageArr=[]  // <<
    if(foodData && foodData.startPage>1){
        pageArr.push(
            <li><a className={"nav-link"} onClick={prev}>&laquo;</a></li>
        )
    }
    if(foodData){
        for(let i:number=foodData.startPage;i<=foodData.endPage;i++){
            pageArr.push(
                <li className={i===curpage?"active":""}><a className={"nav-link"} onClick={()=>pageChange(i)}>{i}</a></li>
            )
        }
    }
    // >>
    if(foodData && foodData.endPage<foodData.totalpage){
        pageArr.push(
            <li><a className={"nav-link"} onClick={next}>&raquo;</a></li>
        )
    }
    return (
        <div className="container">
            <div className="row">
                {html}
            </div>
            <div className="row text-center" style={{"marginTop":"10px"}}>
                <ul className="pagination">
                    {pageArr}
                </ul>

            </div>
        </div>
    )
}
export default Home;