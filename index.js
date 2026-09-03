let data = [];
let toggleTab = 'all';
const add = document.querySelector('.btn_add'); // 新增代辦事項的按鈕
const list = document.querySelector('.list'); // 新增代辦事項的ul
const input = document.querySelector('.task');  // 新增代辦事項的input

// 監聽add,新增值到data,清空input
add.addEventListener('click',(e)=>{
    e.preventDefault(); // 防止預設作用
    if (input.value.trim()==''){return;} // 如果輸入值為空值,不做事情
    let obj={};
    obj.content = input.value;
    obj.checked = false;
    data.push(obj);
    input.value='';
    render();
});

// 如果是點擊到delete就刪除,不是就勾選
list.addEventListener('click',(e)=>{
    let i = e.target.getAttribute('data-num');
    console.log(i);
    if (e.target.nodeName=='A'&& e.target.classList.contains('delete')){
        e.preventDefault();
        data.splice(i,1)
    }else if(e.target.nodeName === 'INPUT' && e.target.type === 'checkbox'){
        data[i].checked = e.target.checked; // 直接同步 UI 狀態
    }
    render();
});

// 新增新陣列newData,push勾選狀態為(True)的後賦予data
const clear = document.querySelector('.clear');
clear.addEventListener('click',(e)=>{
    e.preventDefault();
    let newData=[];
    data.forEach((item,index)=>{
        if (!item.checked){
            newData.push(item);
        }
    });
    data = newData;
    render();
});

// tab
const tab = document.querySelector('.tab');
tab.addEventListener('click',(e)=>{
    if (e.target.nodeName !== 'LI') return;
    let all = document.querySelectorAll('.tab li');
    all.forEach((item)=>{
        item.setAttribute('class','');
    });
    e.target.setAttribute('class','active');
    toggleTab = e.target.getAttribute('data-tab');
    render();
});

// 渲染
const cardList = document.querySelector('.card_list');
function render(){
    if (data.length){
        cardList.style.display='block';
    }else{
        cardList.style.display='none';
    }
    let count = 0;
    let str = '';
    data.forEach((item,index)=>{
        if (!item.checked){
            count++;
            if (toggleTab=='all' || toggleTab=='work'){
                str+=`<li>
            <label class="checkbox" for="">
                <input type="checkbox" data-num="${index}"/>
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
            }
        }else if(toggleTab=='all' || toggleTab=='done'){
            str+=`<li>
            <label class="checkbox" for="">
                <input type="checkbox" checked data-num="${index}"/>
                <span>${item.content}</span>
            </label>
            <a href="#" class="delete" data-num="${index}"></a>
            </li>`;
        }
    });
    list.innerHTML = str;
    const p = document.querySelector('#todo_later');
    p.textContent = count;
};
render();