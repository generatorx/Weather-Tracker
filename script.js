window.addEventListener('load', ()=>{
    let longitude;
    let latitude;
    let timeZone = document.querySelector(".timezone");
    let degree = document.querySelector(".degree");
    let description = document.querySelector(".description h2");
    let icons = document.querySelector(".icon");
    let celciusBtn = document.querySelector(".celcius");
    let fahrenheitBtn = document.querySelector(".fahrenheit");

  

    let degreeSection = document.querySelector(".degree-section span");

    
    if(navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(position =>{
            longitude = position.coords.longitude;
            latitude = position.coords.latitude;
            
            console.log("Longitude: "+ longitude);
            console.log("Latitude: "+ latitude);
            

            const proxy = `http://cors-anywhere.herokuapp.com/`;
            const api = `${proxy}https://api.darksky.net/forecast/77af030ef2f650662a921a94bc919359/${latitude},${longitude}`;

            fetch(api)
                .then(response =>{
                return response.json();
            })
                .then(data =>{
                const {temperature, summary, icon} = data.currently;
                console.log(data);
                timeZone.textContent = data.timezone;
                degree.textContent = temperature;
                description.textContent = summary;
                    setIcons(icon, icons);
                   
                        celciusBtn.addEventListener('click', ()=>{
                            if (degreeSection.textContent == "F") {
                            degree.textContent = ((temperature-32)*5/9).toFixed(2);
                            degreeSection.textContent = "C";
                        
                        };
                    });
                        fahrenheitBtn.addEventListener('click', ()=>{
                            if(degreeSection.textContent == "C") {
                            degree.textContent = temperature;
                            degreeSection.textContent = "F";
                        };
                        });
                    
            
            
        });

    });

    };

    function setIcons(icon, iconID) {
        const skycons = new Skycons({color: "white"});
        const currentIcon = icon.replace(/-/g, "_").toUpperCase();
        skycons.play();
        return skycons.set(iconID, Skycons[currentIcon]);
    };

   
});