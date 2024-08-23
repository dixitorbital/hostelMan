import PropTypes from "prop-types";

TeamCard.propTypes = {
  member: PropTypes.shape({
    name: PropTypes.string.isRequired,
    image: PropTypes.string.isRequired,
    designation: PropTypes.string.isRequired,
  }).isRequired,
};

function TeamCard({ member }) {
  return (
    <div className="rounded-lg shadow-lg p-5  bg-white">
      <div className="relative overflow-hidden p-5 rounded-full w-56 h-56 mx-auto mb-4">
        <img
          className="absolute inset-0 w-full h-full object-cover object-center rounded-full"
          src={member.image}
          alt={member.name}
        />
      </div>
      <div className="text-center">
        <h3 className="text-2xl font-medium text-gray-600 mb-2">
          {member.name}
        </h3>
        <div className="text-gray-500 text-xl mb-4">{member.designation}</div>
        <p>email: {member.designation}@gmail.com</p>
      </div>
    </div>
  );
}

export { TeamCard };
