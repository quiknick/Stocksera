import yfinance.ticker as yf
import pandas as pd
import numpy as np


def ticker_exception(variable, info):
    if variable in info and info[variable] is not None:
        output = info[variable]
    else:
        output = "N/A"
    return output


def default_ticker(request):
    if request.GET.get("quote"):
        ticker_selected = request.GET['quote'].upper()
    else:
        ticker_selected = "AAPL"
    return ticker_selected


def get_ticker_basic(ticker):
    information = ticker.info
    official_name = ticker_exception("longName", information)
    img = information["logo_url"]
    sector = ticker_exception("sector", information)
    industry = ticker_exception("industry", information)

    return official_name, img, sector, industry


def ticker_bar():
    popular_ticker_list = ["SPY", "QQQ", "TQQQ", "DIA", "GOOG", "AAPL", "AMZN", "TSLA", "MSFT", "PLTR", "NVDA",
                           "BB", "ARKK", "ARKF"]
    popular_name_list = ["S&P500 ETF", "NASDAQ-100", "TQQQ", "Dow ETF", "Alphabet", "Apple", "Amazon", "Tesla",
                         "Microsoft", "Palantir", "NVIDIA", "BlackBerry", "ARK Invest", "ARK Fintech"]

    price_list = list()
    for ticker in popular_ticker_list:
    
        ticker = yf.Ticker(ticker)
        price_df = ticker.history(period="3d")['Close']
        opening_price = float(price_df.iloc[1])
        closing_price = float(price_df.iloc[2])

        price_change = str(round(closing_price - opening_price, 2))

        percentage_change = round((1 - opening_price / closing_price) * 100, 2)
        if percentage_change >= 0:
            price_change = '+' + price_change
            percentage_change = '+' + str(percentage_change)

        price_list.append([round(closing_price, 2), price_change, percentage_change])
    return popular_ticker_list, popular_name_list, price_list


def get_loss_at_strike(strike, chain):
    """
    Function to get the loss at the given expiry
    Parameters
    ----------
    strike: Union[int,float]
        Value to calculate total loss at
    chain: Dataframe:
        Dataframe containing at least strike and openInterest
    Returns
    -------
    loss: Union[float,int]
        Total loss
    """

    itm_calls = chain[chain.index < strike][["OI Calls"]]
    itm_calls["loss"] = (strike - itm_calls.index) * itm_calls["OI Calls"]
    call_loss = round(itm_calls["loss"].sum() / 10000, 2)

    # The *-1 below is due to a sign change for plotting in the _view code
    itm_puts = chain[chain.index > strike][["OI Puts"]]
    itm_puts["loss"] = (itm_puts.index - strike) * itm_puts["OI Puts"] * -1
    put_loss = round(itm_puts.loss.sum() / 10000, 2)
    loss = call_loss + put_loss
    return loss, call_loss, put_loss


def get_max_pain(chain: pd.DataFrame):
    """
    Returns the max pain for a given call/put dataframe
    Parameters
    ----------
    chain: DataFrame
        Dataframe to calculate value from
    Returns
    -------
    max_pain :
        Max pain value
    """

    strikes = np.array(chain.index)
    if ("OI Calls" not in chain.columns) or ("OI Puts" not in chain.columns):
        print("Incorrect columns.  Unable to parse max pain")
        return np.nan

    loss_list, call_loss_list, put_loss_list = [], [], []
    for price_at_exp in strikes:
        net_loss, call_loss, put_loss = get_loss_at_strike(price_at_exp, chain)
        loss_list.append(net_loss)
        call_loss_list.append(call_loss)
        put_loss_list.append(put_loss)

    chain["loss"] = loss_list
    max_pain = chain["loss"].idxmin()

    return max_pain, call_loss_list, put_loss_list
