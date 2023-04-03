AFRAME.registerComponent("marker-handler",{
    init : async function() {
        
        await this.getAllToys()

        this.el.addEventListener("markerFound", () =>{
            console.log("marker is found");
            this.handleMarkerFound();
        })

        this.el.addEventListener("markerLost", () =>{
            console.log("marker is lost");
            this.handleMarkerFound();
        })
    },

    handleMarkerFound : function(){
        var butDiv = document.querySelector("button-div")
        butDiv.style.display = "flex";

        var orderButton = document.getElementById("order-button")
        var orderButtonSummary = document.getElementById("order-button-summary")

        orderButton.addEventListener("click",() => {
            swal({
                icon : "https://i.imgur.com/4NZ6uLY.jpg",
                title : "Thanks for the Order !",
                text : "  ",
                timer : 2000,
                buttons : false,
            });
        });

        orderButtonSummary.addEventListener("click",() => {
            swal({
                icon : "warning",
                title : "Order Summary",
                text : "Work in Progress",
            });
        });
    },

    handleMarkerLost: function () {
        // Changing button div visibility
        var buttonDiv = document.getElementById("button-div");
        buttonDiv.style.display = "none";
      },

    getAllToys : async function(){
        return await firebase
        .firestore()
        .collection("toys")
        .get()
        .then(snap => {
            return snap.doc.map(doc => doc.data());
        });
    },
})