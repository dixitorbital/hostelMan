import { TeamCard } from "./TeamMember";
function About() {
  const photo =
    // "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTmINmtxKF3iPsJtYZYWtxKFEHBpi6hUmVVXA&usqp=CAU";
    "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQjes9As0KBB_ufe_alnSpFsvwJLQFkrZws7g&usqp=CAU";

  const user1 = {
    name: "Admin 1",
    designation: "admin1",
    image: photo,
  };
  const user2 = {
    name: "Admin 2",
    designation: "admin2",
    image:
      // "https://w7.pngwing.com/pngs/81/570/png-transparent-profile-logo-computer-icons-user-user-blue-heroes-logo-thumbnail.png",
      photo,
  };

  return (
    <>
      <div className=" text-gray-600 h-screen overflow-y-hidden bg-white">
        <h1 className="font-bold p-5 text-gray-500  bg-white text-center text-4xl">
          Contact Us
        </h1>
        <div className="py-20 sm:py-25 flex gap-20 flex-wrap justify-center align-center">
          <TeamCard member={user1} />
          <TeamCard member={user2} />
        </div>
      </div>
    </>
  );
}
export { About };
