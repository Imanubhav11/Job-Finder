import React, { useEffect, useState } from 'react'
import { RadioGroup, RadioGroupItem } from './ui/radio-group'
import { Label } from './ui/label'
import { useDispatch } from 'react-redux'
import { setSearchedQuery } from '@/redux/jobSlice'

const filterData = [
  {
    filterType: "Location",
    array: ["Delhi NCR", "Bangalore", "Hyderabad", "Pune", "Mumbai"]
  },
  {
    filterType: "Role",
    array: ["Frontend Developer", "Backend Developer", "FullStack Developer", "DevOps Engineer", "Cloud Engineer", "Prompt Engineer", "ML Engineer"]
  },
  {
    filterType: "Salary",
    array: ["0-60k", "40-90k", "90-1.5L", "1.5L+"]
  }
]


const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState('');
    const dispatch = useDispatch();
    const changeHandler = (value) => {
        setSelectedValue(value);
    }
    useEffect(()=>{
        dispatch(setSearchedQuery(selectedValue));
    },[selectedValue]);
  return (
    <div className='w-full'>
        <h1 className='font-bold text-slate-700'>Filter Jobs</h1>
        <hr className='mt-3' />
        <RadioGroup value={selectedValue} onValueChange={changeHandler}>
            {
              filterData.map((data,index) => (
                <div>
                  <h className="font-bold text-lg">{data.filterType}</h>
                  {
                      data.array.map((item,idx) => {
                        const itemId = `id${index}-${idx}`
                        return(
                          <div className='items-center space-x-2 my-2'>
                            <RadioGroupItem value={item} id={itemId}/>
                              <Label htmlFor={itemId}>{item}</Label>
                          </div>
                        )
                      })
                  }
                </div>
              ))
            }
        </RadioGroup>
    </div>
  )
}

export default FilterCard;
