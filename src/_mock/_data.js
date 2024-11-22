import {
  _id,
  _price,
  _times,
  address,
  contact,
  NameOfTheFirm,
  Material,
  _taskNames,
  contactPersonDetails,
  contactPersonName,
  BankDetails,
  _postTitles,
  _description,
  _productNames,
} from './_mock';

// ----------------------------------------------------------------------
const adminData = JSON.parse(localStorage.getItem('admin'));
console.log('adminData',adminData); // { email: "admin@example.com", userName: "AdminName" }

export const _myAccount = {
  displayName:`${adminData?.userName}`,
  email: `${adminData?.email}`,
  photoURL: '/assets/images/avatar/avatar-25.webp',
};

// ----------------------------------------------------------------------

export const _users = [...Array(24)].map((_, index) => ({
  id: _id(index),
  nameOfTheFirm: NameOfTheFirm(index),
  address: address(index),
  contact: contact(index),
  contactPersonName: contactPersonName(index),
  contactPersonDetails: contactPersonDetails(index),
  Material: Material(index),
  BankDetails:BankDetails(index),
}));



// ----------------------------------------------------------------------


// ----------------------------------------------------------------------

const COLORS = [
  '#00AB55',
  '#000000',
  '#FFFFFF',
  '#FFC0CB',
  '#FF4842',
  '#1890FF',
  '#94D82D',
  '#FFC107',
];

// export const _products = [...Array(24)].map((_, index) => {
//   const setIndex = index + 1;

//   return {
//     id: _id(index),
//     price: _price(index),
//     name: _productNames(index),
//     priceSale: setIndex % 3 ? null : _price(index),
//     coverUrl: `/assets/images/product/product-${setIndex}.webp`,
//     colors:
//       (setIndex === 1 && COLORS.slice(0, 2)) ||
//       (setIndex === 2 && COLORS.slice(1, 3)) ||
//       (setIndex === 3 && COLORS.slice(2, 4)) ||
//       (setIndex === 4 && COLORS.slice(3, 6)) ||
//       (setIndex === 23 && COLORS.slice(4, 6)) ||
//       (setIndex === 24 && COLORS.slice(5, 6)) ||
//       COLORS,
//     status:
//       ([1, 3, 5].includes(setIndex) && 'sale') || ([4, 8, 12].includes(setIndex) && 'new') || '',
//   };
// });

// ----------------------------------------------------------------------

export const _langs = [
  {
    value: 'en',
    label: 'English',
    icon: '/assets/icons/flags/ic-flag-en.svg',
  },
  {
    value: 'de',
    label: 'German',
    icon: '/assets/icons/flags/ic-flag-de.svg',
  },
  {
    value: 'fr',
    label: 'French',
    icon: '/assets/icons/flags/ic-flag-fr.svg',
  },
];

// ----------------------------------------------------------------------

export const _timeline = [...Array(5)].map((_, index) => ({
  id: _id(index),
  title: [
    '1983, orders, $4220',
    '12 Invoices have been paid',
    'Order #37745 from September',
    'New order placed #XF-2356',
    'New order placed #XF-2346',
  ][index],
  type: `order${index + 1}`,
  time: _times(index),
}));

// ----------------------------------------------------------------------

export const _tasks = [...Array(5)].map((_, index) => ({
  id: _id(index),
  name: _taskNames(index),
}));

// ----------------------------------------------------------------------

export const _notifications = [
  // {
  //   id: _id(1),
  //   title: 'Your order is placed',
  //   description: 'waiting for shipping',
  //   avatarUrl: null,
  //   type: 'order-placed',
  //   postedAt: _times(1),
  //   isUnRead: true,
  // },
  // {
  //   id: _id(2),
  //   title: 'You have new message',
  //   description: 'answered to your comment on the Minimal',
  //   avatarUrl: '/assets/images/avatar/avatar-2.webp',
  //   type: 'friend-interactive',
  //   postedAt: _times(2),
  //   isUnRead: true,
  // },
  // {
  //   id: _id(3),
  //   title: 'You have new message',
  //   description: '5 unread messages',
  //   avatarUrl: null,
  //   type: 'chat-message',
  //   postedAt: _times(3),
  //   isUnRead: false,
  // },
  // {
  //   id: _id(4),
  //   title: 'You have new mail',
  //   description: 'sent from Guido Padberg',
  //   avatarUrl: null,
  //   type: 'mail',
  //   postedAt: _times(4),
  //   isUnRead: false,
  // },
  // {
  //   id: _id(5),
  //   title: 'Delivery processing',
  //   description: 'Your order is being shipped',
  //   avatarUrl: null,
  //   type: 'order-shipped',
  //   postedAt: _times(5),
  //   isUnRead: false,
  // },
];
