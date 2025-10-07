import React,{useState,useEffect} from 'react';
import './AlgorithmVisu.css';

const AlgorithmVisualizer=()=>
{
    const[activeView,setActiveView]=useState('sorting');
    const[array,setArray]=useState([]);
    const[searchElement,setSearchElement]=useState('');
    const[searchResult,setSearchResult]=useState(null);
    const[speed,setSpeed]=useState(500);
    const[isSorting,setIsSorting]=useState(false);
    const[isSearching,setIsSearching]=useState(false);
    const[algorithm,setAlgorithm]=useState('bubbleSort');
    const[searchAlgorithm,setSearchAlgorithm]=useState('binarySearch');

    const generateArray=()=>
    {
        const newArray=[];
        for(let i =0;i<15;i++)
        {
            newArray.push(Math.floor(Math.random()*30)+1);
        }
        setArray(newArray);
        setSearchResult(null);
        resetColors();
    }

    useEffect(()=>
    {
        generateArray();
    },[]);

    const resetColors=()=>
    {
        const bars=document.getElementsByClassName('array-bar');
        for(let i=0;i<bars.length;i++)
        {
            bars[i].style.backgroundColor='#3498db';
        }
    };

 

const bubbleSort = async () => {
  setIsSorting(true);
  let arr = [...array];
  let len = arr.length;
  const bars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < len; i++) {
    for (let j = 0; j < len - i - 1; j++) {
      bars[j].style.backgroundColor = '#e74c3c';
      bars[j + 1].style.backgroundColor = '#e74c3c';
      await new Promise(resolve => setTimeout(resolve, speed));

      if (arr[j] > arr[j + 1]) {
        [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]];
        setArray([...arr]);
      }

      bars[j].style.backgroundColor = '#3498db';
      bars[j + 1].style.backgroundColor = '#3498db';
    }
    bars[len - i - 1].style.backgroundColor = '#2ecc71';
  }

  setIsSorting(false);
};


const selectionSort = async () => {
  setIsSorting(true);
  let arr = [...array];
  let len = arr.length;
  const bars = document.getElementsByClassName('array-bar');

  for (let i = 0; i < len - 1; i++) {
    let minIndex = i;
    bars[minIndex].style.backgroundColor = '#9b59b6';
    await new Promise(resolve => setTimeout(resolve, speed / 2));

    for (let j = i + 1; j < len; j++) {
      bars[j].style.backgroundColor = '#f39c12';
      await new Promise(resolve => setTimeout(resolve, speed / 2));

      if (arr[j] < arr[minIndex]) {
        bars[minIndex].style.backgroundColor = '#3498db';
        minIndex = j;
        bars[minIndex].style.backgroundColor = '#9b59b6';
      } else {
        bars[j].style.backgroundColor = '#3498db';
      }
    }

    if (minIndex !== i) {
      [arr[i], arr[minIndex]] = [arr[minIndex], arr[i]];
      setArray([...arr]);
    }

    bars[i].style.backgroundColor = '#2ecc71';
  }
  bars[len - 1].style.backgroundColor = '#2ecc71';
  setIsSorting(false);
};

    

    const linearSearch=async()=>
    {
        if(!searchElement) return;
        setIsSearching(true);
        resetColors();
        const target=parseInt(searchElement);
        let found=false;
        let bars=document.getElementsByClassName('array-bar');
        for(let i=0;i<array.length;i++)
        {
            bars[i].style.backgroundColor='#f39c12';
            await new Promise(resolve=>setTimeout(resolve,speed));
            if(array[i]===target)
            {
                bars[i].style.backgroundColor='#f39c12';
                await new Promise(resolve=>setTimeout(resolve,speed));
                setSearchResult(i);
                found=true;
                break;
            }
            else
            {
                bars[i].style.backgroundColor='#e74c3c';
                await new Promise(resolve=>setTimeout(resolve,speed/2));
            }
        }
        if(!found)    setSearchResult(-1);
       setIsSearching(false);
    };


    const binarySearch = async () => {
    if (!searchElement) return;
   
    setIsSearching(true);
    resetColors();
    const target = parseInt(searchElement);
    let sortedArray = [...array].sort((a, b) => a - b);
    setArray(sortedArray);
   
    let left = 0;
    let right = sortedArray.length - 1;
    let found = false;
    let bars = document.getElementsByClassName('array-bar');
   
    while (left <= right) {
      let mid = Math.floor((left + right) / 2);
      bars[mid].style.backgroundColor = '#f39c12';
      await new Promise(resolve => setTimeout(resolve, speed));
     
      if (sortedArray[mid] === target) {
        bars[mid].style.backgroundColor = '#2ecc71';
        setSearchResult(mid);
        found = true;
        break;
      } else if (sortedArray[mid] < target) {
        for (let i = left; i <= mid; i++) {
          bars[i].style.backgroundColor = '#e74c3c';
        }
        left = mid + 1;
      } else {
        for (let i = mid; i <= right; i++) {
          bars[i].style.backgroundColor = '#e74c3c';
        }
        right = mid - 1;
      }
     
      await new Promise(resolve => setTimeout(resolve, speed / 2));
    }
   
    if (!found) {
      setSearchResult(-1);
    }
    setIsSearching(false);
  };

  const handleSort=()=>
  {
    resetColors();
    if(algorithm==='bubbleSort') bubbleSort();
    else if(algorithm==='selectionSort') selectionSort();
  };
  
  const handleSearch=()=>
  {
    resetColors();
    if(searchAlgorithm==='linearSearch') linearSearch();
    else if(searchAlgorithm==='binarySearch') binarySearch();   
  };


  return (

    <div className="App">
        <nav className="navbar">
            <h1>Algorithm Visualizer</h1>
            <div className="nav-buttons">
                <button
                onClick={()=>setActiveView('sorting')}
                className={activeView==='sorting'?'active':''}
                >
                    Sorting
                </button>

                <button
                onClick={()=>setActiveView('searching')}
                className={activeView==='searching'?'active':''}
                >
                    Searching
                </button>
            </div>
        </nav>


        <div className="content">
            <div className="common-controls">
                <button
                    onClick={generateArray}
                    disabled={isSorting || isSearching}
                    className="generate-btn"
                    >
                        Generate New Array
                </button>

                <div className="speed-control">
                    <label>Speed: </label>
                    <input
                     type="range"
                     min="50"
                     max="1000"
                     value={speed}
                     onChange={(e)=>setSpeed(parseInt(e.target.value))}
                     />
                     <span>{speed}ms</span>
                </div>
            </div>

            {activeView === 'sorting' ? (
          <div className="sorting-view">
            <div className="controls">
              <div className="algorithm-selector">
                <h2>Sorting Algorithm</h2>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="sortAlgorithm"
                      value="bubbleSort"
                      checked={algorithm === 'bubbleSort'}
                      onChange={() => setAlgorithm('bubbleSort')}
                    />
                    Bubble Sort
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="sortAlgorithm"
                      value="selectionSort"
                      checked={algorithm === 'selectionSort'}
                      onChange={() => setAlgorithm('selectionSort')}
                    />
                    Selection Sort
                  </label>
                </div>
              </div>
             
              <button
                onClick={handleSort}
                disabled={isSorting}
                className="action-btn"
              >
                {algorithm === 'bubbleSort' ? 'Bubble Sort' : 'Selection Sort'}
              </button>
            </div>
          </div>
        ) : (
          <div className="searching-view">
            <div className="controls">
              <div className="algorithm-selector">
                <h2>Searching Algorithm</h2>
                <div className="radio-group">
                  <label>
                    <input
                      type="radio"
                      name="searchAlgorithm"
                      value="binarySearch"
                      checked={searchAlgorithm === 'binarySearch'}
                      onChange={() => setSearchAlgorithm('binarySearch')}
                    />
                    Binary Search
                  </label>
                  <label>
                    <input
                      type="radio"
                      name="searchAlgorithm"
                      value="linearSearch"
                      checked={searchAlgorithm === 'linearSearch'}
                      onChange={() => setSearchAlgorithm('linearSearch')}
                    />
                    Linear Search
                  </label>
                </div>
              </div>
             
              <div className="search-input-group">
                <input
                  type="number"
                  placeholder="Enter an element (1-30)"
                  value={searchElement}
                  onChange={(e) => setSearchElement(e.target.value)}
                  min=""
                  max="30"
                />
                <button
                  onClick={handleSearch}
                  disabled={isSearching}
                  className="action-btn"
                >
                  Search
                </button>
              </div>
            </div>
           
            {searchResult !== null && (
              <div className="search-result">
                {searchResult === -1 ? (
                  <p>Element not found in the array!</p>
                ) : (
                  <p>Element found at index: {searchResult}</p>
                )}
              </div>
            )}
          </div>
        )}
       
        
        <div className="array-container">
          {array.map((value, idx) => (
            <div
              key={idx}
              className="array-bar"
              style={{
                height: `${value * 8}px`,
                width: `${100 / array.length}%`,
              }}
            >
              <span className="bar-value">{value}</span>
            </div>
          ))}
        </div>
      </div>
     
      <div className="footer">
        <p>{new Date().toLocaleTimeString()} {new Date().toLocaleDateString()}</p>
      </div>
    </div>
  );
};

export default AlgorithmVisualizer;