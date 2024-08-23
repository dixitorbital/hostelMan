import PropTypes from "prop-types";

Input.propTypes = {
  field: PropTypes.shape({
    name: PropTypes.string.isRequired,
    placeholder: PropTypes.string.isRequired,
    req: PropTypes.bool.isRequired,
    type: PropTypes.string.isRequired,
    onChange: PropTypes.func.isRequired,
    value: PropTypes.string,
  }).isRequired,
};

function Input({ field }) {
  const name = field.name;
  const placeholder = field.placeholder;
  const required = field.req;
  const type = field.type;
  const value = field.value;
  console.log("input value", value);
  return (
    <div className="text-gray-600">
      <label
        htmlFor={name}
        className="block mb-2 text-sm font-medium text-gray-600"
      >
        Your {name}
      </label>

      {/* className="shadow-sm bg-gray-50 border text-black border-gray-300 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-600 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500 dark:shadow-sm-light"*/}
      <input
        type={type}
        name={name}
        id={name}
        className="border  rounded-lg block w-full  p-2.5 bg-white border-gray-300  text-gray-600 outline-none"
        placeholder={placeholder}
        required={required}
        value={value}
        onChange={field.onChange}
      />
    </div>
  );
}

export { Input };
