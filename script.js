function addTask() {
    const input = document.getElementById('task-input');
    const taskText = input.value.trim();
    
    if (taskText === "") {
        alert("任務內容不能為空！");
        return;
    }

    const inboxList = document.getElementById('inbox-list');
    
    // 創建新的任務項目 (li)
    const newTaskItem = document.createElement('li');
    newTaskItem.className = 'task-item';

    // 創建 checkbox 和 label
    const taskId = 'task-' + Date.now(); // 確保ID唯一
    
    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = taskId;

    const label = document.createElement('label');
    label.htmlFor = taskId;
    label.textContent = taskText;

    // 這裡我們預設給一個標籤
    const tag = document.createElement('span');
    tag.className = 'tag tag-new';
    tag.textContent = '#未分類';

    // 將元素組合
    newTaskItem.appendChild(checkbox);
    newTaskItem.appendChild(label);
    newTaskItem.appendChild(tag);

    // 添加到收件匣清單
    inboxList.appendChild(newTaskItem);

    // 清空輸入框
    input.value = '';
}