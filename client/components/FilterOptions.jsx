import React from 'react'

const FilterOptions = () => {
    const specialities = [
        "Dentist",
        "Heart",
        "Mental",
        "Physco",
        "Physical",
        "Orthodontist",
        "Dinasour",
      ];
      const options = [
        {
          title: "Speciality",
          options: [
            "Dentist",
            "Heart",
            "Mental",
            "Physco",
            "Physical",
            "Orthodontist",
            "Dinasour",
          ],
          height : 150
        },
        {
          title: "Location",
          options: ["Indore", "Bhopal", "Gaziabad", "Nearby"],
          height : 140
        },
        {
          title: "Disease",
          options: ["Fever", "Atarol", "Stomach Ache", "Headache"],
          height : 100
        },
      ];
  return (
    <div className="bg-white p-3 px-4 rounded-md w-[21vw]">
    <div className="flex justify-between items-center">
      <div className="text-gray-600 font-medium">Filters</div>
      <div className="text-sm text-black underline">Clear All</div>
    </div>
    {options.map((option) => (
      <div>
        <hr className="mt-5 mb-5" />
        <div>
          <div className="text-sm">{option.title}</div>
          <div className="mt-2">
            <input
              type="text"
              className="border-2 w-full h-[35px] rounded-md text-sm p-2"
              placeholder={`Search by ${option.title}`}
            />
          </div>
          <div className="mt-4 space-y-2 overflow-y-auto" style={{height :` ${option.height}px`}}>
            {option.options.map((name) => (
              <div className="flex space-x-2 items-center">
                <div>
                  <input
                    type="checkbox"
                    className="appearance-none border-2 h-4 w-4 checked:bg-primary"
                  />
                </div>
                <div className="-mt-1 text-sm">{name}</div>
              </div>
            ))}
          </div>
        </div>
      </div>
    ))}
  </div>
  )
}

export default FilterOptions