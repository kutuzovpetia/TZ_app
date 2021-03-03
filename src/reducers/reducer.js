const initialState = {
    data : [],                // Массив обьектов
    showSpiner: true,         // Показать спинер
    showButtonsDelete: false, // Показать кнопки удаления
    showAddControls: false,   // Показать инпуты для ввода
    showEditControls: false,  // Показать кнопки редактирования
    fullName: '',             // Полное имя
    email: '',                // Почта
    age: '',                  // Возраст
}

const reducer = (state = initialState, action) =>{

    switch (action.type) {
        case 'DATA':
          return  state.data
        case 'SET_DATA':
          return  {...state, data: action.value}
        case 'SHOW_SPINNER':
          return {...state, showSpiner : !state.showSpiner}  
        case 'SHOW_BUTTONS_DELETE':
          return {...state, showButtonsDelete : !state.showButtonsDelete} 
        case 'SHOW_ADD_CONTROLS':
            return {...state, showAddControls : !state.showAddControls} 
        case 'SHOW_BUTTONS_EDIT':
            return {...state, showEditControls : !state.showEditControls} 
        case 'ADD_USER':
          return {...state, data: [...state.data, action.value]} 
        case 'SET_FULL_NAME':
            return {...state, fullName: action.value} 
        case 'SET_EMAIL':
            return {...state, email: action.value} 
        case 'SET_AGE':
            return {...state, age: action.value} 
        default:
          return state;
    }
}

export default reducer;