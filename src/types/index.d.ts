// src/types/images.d.ts
declare module '*.jpg';
declare module '*.jpeg';
declare module '*.png';
declare module '*.svg';

// General types
type ButtonType = {
    text: string,
    link: string
}

type BasicDataType = {
    title: string,
    description: string,
    button: ButtonType
}

// Home specific types
type ContactDataType = {
    title: string,
    textContact: string[],
    subheading: string,
    buttons: ButtonType[]
}

// Rooms specific types
type RoomType = {
    title: string,
    description: string,
    price: string,
    utilities: string[]
    button: ButtonType
}

// Restaurant specific types
type DetailsType = {
    title: string,
    description_main: string,
    description_par1: string,
    description_par2: string
}

type DishType = {
    name: string,
    description: string,
    price: string
}

type MenuType = {
    subheading: string,
    dishes: DishType[]
}

// services and activities specific types
type TitleDescElemType = {
    title: string,
    description: string
  }
  
  type SAADataType = {
    title: string,
    description: string,
    itemList: TitleDescElemType[]
  }
  