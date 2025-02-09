function show_dd(type, elem) {
    var dd_btn = document.getElementsByClassName("dd_btn")[0].querySelectorAll("button")
    for (i=0; i<dd_btn.length; i++) {
        dd_btn[i].classList.remove("selected")
    }
    elem.classList.add("selected");

    if (type == "analysis") {
        text = "View latest price, key statistics, major holders, institutional holders, earnings, recommendations and sort historical data."
        url = "/ticker/"
    }
    else if (type == "financials") {
        text = "Get Balance Sheet of a company. Income Statement and Cash Flow will be added in the next update."
        url = "/ticker/financial/"
    }
    else if (type == "options") {
        text = "View max pain for the week, Call & Put Ratio and option chain of a ticker."
        url = "/ticker/options/"
    }
    else if (type == "short_volume") {
        text = "Get short volume of some of the popular tickers. Data is from shortvolumes.com."
        url = "/ticker/short_volume/"
    }
    else if (type == "ftd") {
        text = "View Failure to Deliver (FTD) data of some of the popular tickers. Data is updated whenever latest information from SEC is available."
        url = "/ticker/failure_to_deliver/"
    }
    document.getElementById("dd_description").innerHTML = `
        <div class="section_div_text">${text}</div><div class="href_btn"><a href="${url}">VIEW MORE</a></div>`
}

function show_reddit(type, elem) {
    var reddit_btn = document.getElementsByClassName("reddit_btn")[0].querySelectorAll("button")
    for (i=0; i<reddit_btn.length; i++) {
        reddit_btn[i].classList.remove("selected")
    }
    elem.classList.add("selected");

    if (type == "reddit_trending") {
        text = "Get trending tickers on stocks & crypto-related subreddits based on sentiment, number of posts, comments and upvotes."
        url = "/reddit_analysis/"
    }
    else if (type == "reddit_etf") {
        text = "WSB ETF contains the top 10 trending tickers on r/wallstreetbets. Past performance included as well."
        url = "/reddit_etf/"
    }
    else if (type == "subreddit") {
        text = "View percentage of growth in users and active users in popular subreddits."
        url = "/subreddit_count/"
    }
    document.getElementById("reddit_description").innerHTML = `
        <div class="section_div_text">${text}</div><div class="href_btn"><a href="${url}">VIEW MORE</a></div>`
}

function show_discover(type, elem) {
    var discover_btn = document.getElementsByClassName("discover_btn")[0].querySelectorAll("button")
    for (i=0; i<discover_btn.length; i++) {
        discover_btn[i].classList.remove("selected")
    }
    elem.classList.add("selected");

    if (type == "overview") {
        text = "View performance of the entire market, futures, commodities, forex, cryptocurrencies and economic events"
        url = "/market_overview/"
    }
    else if (type == "short_int") {
        text = "View stocks with high short interest. Squeeze time!"
        url = "/short_interest/"
    }
    else if (type == "low_float") {
        text = "View stocks with low float."
        url = "/low_float/"
    }
    else if (type == "hedge") {
        text = "View 13F fillings of some of the largest hedge funds such as Citadel and Melvin Capital."
        url = "/hedge_funds/"
    }
    else if (type == "ark") {
        text = "Get holdings, daily trades and news of ARK Fund."
        url = "/ark_trades/"
    }
    else if (type == "economy") {
        text = "View reverse-repo transactions, daily treasury statement & inflation levels over the years."
        url = "/reverse_repo/"
    }
    else if (type == "amd_xlnx_ratio") {
        text = "View current AMD-XLNX Share Price Ratio and percentage upside for XLNX when the merger is complete"
        url = "/amd_xlnx_ratio/"
    }
    document.getElementById("discover_description").innerHTML = `
        <div class="section_div_text">${text}</div><div class="href_btn"><a href="${url}">VIEW MORE</a></div>`
}

function show_op(type, elem) {
    var op_btn = document.getElementsByClassName("op_btn")[0].querySelectorAll("button")
    for (i=0; i<op_btn.length; i++) {
        op_btn[i].classList.remove("selected")
    }
    elem.classList.add("selected");

    if (type == "video") {
        text = "Watch out for new videos in our YouTube Channel for new updates in the future!"
        url = "https://www.youtube.com/watch?v=SEYXEcVKt38"
    }
    else if (type == "donate") {
        text = `Stocksera is an open-source application.
                I spent months creating this application, with no monetary benefits.
                If you like this project, you can suppoort me via <a href="https://www.paypal.me/stocksera" target="_blank">Paypal</a>.`
        url = "https://www.paypal.com/paypalme/stocksera"
    }
    else if (type == "code") {
        text = "You can view the code in GitHub. Do give a star if you like it!"
        url = "https://github.com/spartan737/Stocksera"
    }
    document.getElementById("op_description").innerHTML = `
        <div class="section_div_text">${text}</div><div class="href_btn"><a href="${url}" target="_blank">VIEW MORE</a></div>`
}