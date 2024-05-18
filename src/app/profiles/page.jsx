// pages/profiles/page.js
import UserProfile from '../../components/profilesComponent/UserProfile';
import AddressList from '../../components/profilesComponent/AddressList';
import CheckoutList from '../../components/profilesComponent/CheckoutList';

const ProfilePage = ({ user, addresses, checkouts }) => {
  return (
    <div className="flex flex-col items-center p-8 bg-gray-50 min-h-screen">
      <UserProfile user={user} />
      <AddressList addresses={addresses} />
      <CheckoutList checkouts={checkouts} />
    </div>
  );
};

// export async function getServerSideProps() {
//   // Fetch data from an API or database
//   const resUser = await fetch('https://api.example.com/user');
//   const user = await resUser.json();

//   const resAddresses = await fetch('https://api.example.com/user/addresses');
//   const addresses = await resAddresses.json();

//   const resCheckouts = await fetch('https://api.example.com/user/checkouts');
//   const checkouts = await resCheckouts.json();

//   return {
//     props: {
//       user,
//       addresses,
//       checkouts
//     },
//   };
// }

export default ProfilePage;
