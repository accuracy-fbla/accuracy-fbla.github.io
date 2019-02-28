

function toggleActiveClass(num) {
    for (var i = 1; i <= 4; i++) {
        document.getElementById("divP" + i).classList.remove("activePricing");
    }
    document.getElementById("divP" + num).classList.add("activePricing");

}

function toggleMY() {
    var isM = document.getElementById("monthly").style.fontWeight==100;
    var month = document.getElementById("monthly");
    month.style.fontWeight = (month.style.fontWeight==600)?100:600;
    var year = document.getElementById("yearly");
    year.style.fontWeight = (year.style.fontWeight=="600")?"100":"600";


    if (isM) {
        document.getElementById("pBasic").innerHTML = "" +
            "$<b class=\"priceNumber\">50</b>\n" +
            "<br>monthly";

        document.getElementById("pPremium").innerHTML = "" +
            "$<b class=\"priceNumber\">200</b>\n" +
            "<br>monthly";

        document.getElementById("pEnterprise").innerHTML = "" +
            "$<b class=\"priceNumber\">500</b>\n" +
            "<br>monthly";
    } else {
        document.getElementById("pBasic").innerHTML = "" +
            "$<b class=\"priceNumber\">550</b>\n" +
            "<br>yearly";

        document.getElementById("pPremium").innerHTML = "" +
            "$<b class=\"priceNumber\">2000</b>\n" +
            "<br>yearly";

        document.getElementById("pEnterprise").innerHTML = "" +
            "$<b class=\"priceNumber\">9000</b>\n" +
            "<br>yearly";
    }
}