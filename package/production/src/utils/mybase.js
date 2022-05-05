//通用基础函数
import { Message } from 'element-ui';
export default {
        //post下载文件
        postFile(url,data){
                let myform = document.createElement('form');  
                myform.setAttribute('action',url);  
                myform.setAttribute('method','post');  
                for(let item in data){
                    let myinput = document.createElement('input')
                    myinput.setAttribute('value', data[item]);  
                    myinput.setAttribute('name', item);  
                    myform.appendChild(myinput);  
                }  
                document.getElementsByTagName("body")[0].appendChild(myform)
                myform.submit()
                myform.remove();
        },
        //url序列化
        formD(obj){
                const formData = new URLSearchParams();
                Object.keys(obj).forEach((key) => {
                  if (obj[key] instanceof Array) {
                    obj[key].forEach((item) => {
                      formData.append(key, item);
                    });
                    return;
                  }
                  formData.append(key, obj[key]);
                });
                return formData;
        },
        //点击复制文字
        copyT(text){ 
                if(text==''){
                        return false
                }
                let myinput = document.createElement('input') 
                myinput.setAttribute('id', 'copyinput');  
                document.getElementsByTagName("body")[0].appendChild(myinput)  
                myinput.value=text
                myinput.select(); // 选择对象 
                document.execCommand("Copy"); // 执行浏览器复制命令
                myinput.remove();
                Message.success("复制成功")
        },
        deepCopy(o) {          //深度copy
                return JSON.parse(JSON.stringify(o))
        },
        tableFormatter(cell){
                if(cell.cellValue===undefined||cell.cellValue===""){
                    return '---'
                }
                return cell.cellValue
        },
        myFootMethod({columns,data}){
                if(data.length==0){
                        return[[]]
                }
                let sums=[] 
                columns.forEach((col,index)=>{
                        try{
                                if(col.params.sumType==undefined||col.params.sumType==''){
                                        sums[index]=''
                                }else
                                if(col.params.sumType.search(/sum/)!==-1){
                                        let sum=0
                                        try{
                                                for(let i of data){
                                                        if(!isNaN(Number(i[col.property]))){
                                                                sum+=Number(i[col.property])
                                                        }
                                                }
                                                sums[index]=col.params.sumType.replace(/sum/,Number(sum.toFixed(2)))
                                        }catch(e){
                                                console.log(e)
                                                sums[index]=''
                                        }
                                }else
                                if(col.params.sumType.search(/count/)!==-1){
                                        sums[index]=col.params.sumType.replace(/count/,data.length)
                                }else
                                if(col.params.sumType.search(/average/)!==-1){
                                        let sum=0
                                        try{
                                                for(let i of data){
                                                        console.log(i[col.property])
                                                        if(!isNaN(Number(i[col.property]))){
                                                                sum+=Number(i[col.property])
                                                        }
                                                }
                                                sums[index]=col.params.sumType.replace(/average/,Number((Number(sum.toFixed(2))/data.length).toFixed(2)))
                                        }catch(e){
                                                console.log(e)
                                                sums[index]=''
                                        }
                                }else{
                                        sums[index]=col.params.sumType
                                }
                        }catch(e){
                                console.log(e)
                                sums[index]=""
                        }
                })
                return[sums]
        },
}