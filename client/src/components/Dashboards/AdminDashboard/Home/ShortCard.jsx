import PropTypes from "prop-types";

ShortCard.propTypes = {
  title: PropTypes.string.isRequired,
  number: PropTypes.number.isRequired,
};

function ShortCard({ number, title }) {
  return (
    <div className="py-5 w-[200px] h-[200px] bg-gray-100 shadow-lg bottom-1 border-gray-300  text-gray-600 flex flex-col gap-3 items-center justify-around rounded-xl  ">
      <div className="text-7xl  text-[#25385e] font-bold">{number}</div>
      <div className="text-2xl font-semibold">{title}</div>
    </div>
  );
}

export { ShortCard };
