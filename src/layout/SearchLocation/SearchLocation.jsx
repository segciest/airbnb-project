import { formatISO, parseISO } from 'date-fns';
import moment from 'moment';
import React, { useEffect, useRef, useState } from 'react';
import { DateRangePicker } from 'react-date-range';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  setDateRange,
  setLocatedAt,
  setNumPeople,
} from '../../redux/slice/searchSlice';
import { viTriServ } from '../../services/viTriServ';
import './SearchLocation.scss';

const SearchLocation = () => {
  const [openDate, setOpenDate] = useState(false);
  const [showGuestControls, setShowGuestControls] = useState(false);
  const [locations, setLocations] = useState([]);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [showLocationDropdown, setShowLocationDropdown] = useState(false);
  const datePickerRef = useRef(null);
  const guestPickerRef = useRef(null);
  const locationRef = useRef(null);
  const handleClickOutside = (event) => {
    if (
      datePickerRef.current &&
      !datePickerRef.current.contains(event.target)
    ) {
      setOpenDate(false);
    }
    if (
      guestPickerRef.current &&
      !guestPickerRef.current.contains(event.target)
    ) {
      setShowGuestControls(false);
    }
    if (locationRef.current && !locationRef.current.contains(event.target)) {
      setShowLocationDropdown(false);
    }
  };

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openDate, showGuestControls, showLocationDropdown]);

  const { locatedAt, dateRange, numPeople } = useSelector(
    (state) => state.searchSlice
  );
  const navigate = useNavigate();
  const handleOpenDate = () => {
    setOpenDate(!openDate);
  };
  const handleGuestClick = () => {
    setShowGuestControls(!showGuestControls);
  };
  const handleGuestChange = (change) => {
    const newGuestCount = numPeople + change;
    if (newGuestCount > 0) {
      dispatch(setNumPeople(newGuestCount));
    }
  };
  useEffect(() => {
    viTriServ.getViTri().then((res) => {
      setLocations(res.data.content);
    });
  }, []);
  const handleLocationSelect = (location) => {
    dispatch(setLocatedAt(location.tinhThanh));
    setSelectedLocation(location.tinhThanh);
    setShowLocationDropdown(false);
  };
  const dispatch = useDispatch();
  return (
    <section className="search-location relative py-10">
      <div className="container relative">
        <div className="grid lg:grid-cols-12 sm:grid-cols-1 border-2 border-gray-300 md:rounded-full">
          <div
            className="col-span-3 flex flex-col justify-center items-center cursor-pointer flex-1 px-6 py-3"
            onClick={() => setShowLocationDropdown(true)}
          >
            <p className="text-sm">Location</p>
            <p
              className={`text-sm ${
                !selectedLocation ? 'text-gray-400' : 'font-semibold'
              }`}
            >
              {selectedLocation ? selectedLocation : 'Where are you going?'}
            </p>
            {showLocationDropdown && (
              <div
                className="absolute z-10 top-[58px] left-0 bg-white rounded-lg border-2 border-gray-300 overflow-y-auto lg:max-h-96 max-h-60"
                ref={locationRef}
              >
                <h1 className="text-lg text-center font-medium py-2">
                  Search for locations
                </h1>
                <ul className="grid grid-cols-3 gap-4 z-999">
                  {locations.map((location) => (
                    <li
                      key={location.id}
                      onClick={() => {
                        handleLocationSelect(location);
                        dispatch(setLocatedAt(location.id));
                      }}
                      className="px-4 py-2 hover:bg-gray-100 cursor-pointer flex items-center"
                    >
                      <img
                        src={location.hinhAnh}
                        alt={location.tinhThanh}
                        className="w-20 h-20 rounded-lg mr-2"
                      />
                      <span>{location.tinhThanh}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
            <div className="lg:hidden border-b border-gray-400 w-9/12 py-2"></div>
          </div>
          <div className="col-span-1 sm:hidden lg:flex justify-center">
            <div className="my-3 border-l-[1px] border-gray-400"></div>
          </div>
          <div
            className="col-span-3 flex flex-col flex-1 justify-center items-center cursor-pointer relative sm:h-16"
            onClick={handleOpenDate}
          >
            <p>
              {moment(parseISO(dateRange[0]?.startDate)).format('DD/MM/YYYY')} –
              {moment(parseISO(dateRange[0]?.endDate)).format('DD/MM/YYYY')}
            </p>
            {openDate && (
              <div
                ref={datePickerRef}
                className="absolute z-10 top-[70px] left-1/2 transform -translate-x-1/2 bg-white rounded-lg border-2 border-gray-300 overflow-y-auto cursor-auto overflow-hidden"
                style={{ overscrollBehavior: 'none' }}
                onClick={(e) => e.stopPropagation()}
              >
                <DateRangePicker
                  className="p-6 flex lg:max-h-full lg:w-full sm:w-1/4 sm:h-1/4 overflow-auto"
                  onChange={(item) =>
                    dispatch(
                      setDateRange([
                        {
                          ...item.selection,
                          startDate: formatISO(item.selection.startDate),
                          endDate: formatISO(item.selection.endDate),
                        },
                      ])
                    )
                  }
                  ranges={dateRange.map((range) => ({
                    ...range,
                    startDate: parseISO(range.startDate),
                    endDate: parseISO(range.endDate),
                  }))}
                  showSelectionPreview={true}
                  moveRangeOnFirstSelection={false}
                  months={2}
                  minDate={new Date()}
                  direction="horizontal"
                  rangeColors={['#FD5B61']}
                  color="#FD5B61"
                />
              </div>
            )}
            <div className="lg:hidden border-b border-gray-400 w-8/12 py-2"></div>
          </div>
          <div className="col-span-1 sm:hidden lg:flex justify-center">
            <div className="my-3 border-l-[1px] border-gray-400"></div>
          </div>
          <div
            className="col-span-3 flex flex-col justify-center items-center cursor-pointer flex-1 px-6 py-3 relative"
            onClick={handleGuestClick}
            ref={guestPickerRef}
          >
            <p className="text-sm">Guests</p>
            <p className="text-sm text-gray-400">{numPeople} guest(s)</p>
            {showGuestControls && (
              <div className="absolute z-10 top-[70px] left-1/2 transform -translate-x-1/2 bg-white rounded-lg border-2 border-gray-300 p-3">
                <div className="flex items-center space-x-8">
                  <button
                    className="p-2 border rounded-full bg-[#FD5B61]"
                    onClick={() => handleGuestChange(-1)}
                  >
                    <i className="fa-solid fa-minus text-white"></i>
                  </button>
                  <span>{numPeople}</span>
                  <button
                    className="p-2 border rounded-full bg-[#FD5B61]"
                    onClick={() => handleGuestChange(1)}
                  >
                    <i className="fa-solid fa-plus text-white"></i>
                  </button>
                </div>
              </div>
            )}
            <div className="lg:hidden border-b border-gray-400 w-9/12 py-2"></div>
          </div>
          <div className="lg:col-span-1 flex justify-center items-center cursor-pointer flex-1 col-span-3 lg:mb-0 mb-3">
            <button
              className="bg-[#FD5B61] hover:bg-[#cc494e] transition-all text-white rounded-full px-3 py-3 flex items-center space-x-2"
              onClick={() => {
                if (!locatedAt) {
                  navigate(`/rooms`);
                } else {
                  navigate(`/rooms/${locatedAt}`);
                  window.location.reload();
                }
              }}
            >
              <i className="fa-solid fa-magnifying-glass"></i>
              <span>Search</span>
            </button>
          </div>
        </div>
        <div className="flex flex-wrap justify-center mt-10 gap-3">
          <button className="rounded-lg text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2">
            Type of accommodation
          </button>
          <button className="rounded-lg text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2">
            Price
          </button>
          <button className="rounded-lg text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2">
            Book now
          </button>
          <button className="rounded-lg text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2">
            Room and bedroom
          </button>
          <button className="rounded-lg text-md bg-white text-black border border-gray-300 hover:border-gray-900 duration-300 px-6 py-2">
            Other filters
          </button>
        </div>
      </div>
    </section>
  );
};

export default SearchLocation;
