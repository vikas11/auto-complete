import { ChangeEvent, Component } from "react";
import './auto-complete.scss';

type autoCompleteState = {
    usZipCodes: Array<string>;
    searchInput: string;
    searchResults: Array<string>;
    hasResults: boolean;
    inputError: boolean;
    lastSelectedValue: string;
}

export class AutoCompleteComponent extends Component<{}, autoCompleteState> {
    handleKeyUp: any;
    handleOnBlur: any;
    constructor(props: any) {
        super(props);
        this.handleKeyUp = this.onInputKeyUp.bind(this);
        this.handleOnBlur = this.onInputBlur.bind(this);
    }

    // After the component did mount, we set the state each second.
    componentDidMount() {
        //https://codigo-postal.co/en-us/usa/
        this.setState({
            usZipCodes: ['35004', '36925', '99501', '99950', '85001', '86556', '71601', '72959', '90001', '96162', '80001', '81658', '06001', '06928', '19701', '19980', '32003', '34997', '30002', '39901', '96701', '96898'],
            hasResults: false
        });
    }

    search = (str: any) => {
        let results = [];
        if (str.length > 0) {
            const val = str.toLowerCase();
            for (let i: number = 0; i < this.state.usZipCodes.length; i++) {
                if (this.state.usZipCodes[i].toString().toLowerCase().indexOf(val) > -1) {
                    results.push(this.state.usZipCodes[i]);
                }
            }
        }
        this.setState({
            searchResults: results,
            searchInput: str,
            hasResults: results.length > 0 ? true : false,
            inputError: false
        });
    }

    onInputKeyUp = (e: ChangeEvent<HTMLInputElement>) => {
        const re = /^[0-9\b]+$/;
        if (e.target.value === '' || re.test(e.target.value)) {
            const inputVal = e.target.value;
            let results: any = [];
            results = this.search(inputVal);
        }
        else {
            this.setState({
                searchResults: [],
                searchInput: '',
                hasResults: false,
                inputError: true
            });
        }
    }

    onInputBlur = () => {
        this.setState({
            hasResults: false,
            lastSelectedValue: '',
            searchResults: []
        });
        let input: any = document.getElementById('searchBox');
        input.value = '';
    }

    showSuggestions = () => {
        let hasResults = 'ul-auto ' + '' + (this.state.hasResults ? 'has-suggestions' : '');
        return <ul className={hasResults}>
            {

                this.state.searchResults.map((result: any, i: number) => {                   
                    const match = result.match(new RegExp(this.state.searchInput, 'i'));
                    return <li className="auto-li" onClick={() => this.useSuggestion(match.input)}>

                        {result.replace(match[0], `${match[0]}`)}

                    </li>;
                })
            }
        </ul>
    }

    useSuggestion = (e: any) => {
        this.setState({
            hasResults: false,
            lastSelectedValue: e
        });
        let input: any = document.getElementById('searchBox');
        input.value = e;
        input.focus();
    }

    render() {
        return (
            <>
                <div className="search-container" key={'1234'}>
                    <input id="searchBox" autoComplete="off" maxLength={6} onKeyUp={this.handleKeyUp} type={"text"} placeholder="Search By ZipCode" />
                    {this.state?.inputError ? <><br></br><span className="error">Only Numeric Zipcode allowed</span></> : ""}
                    {this.state?.lastSelectedValue ? <><br></br><span className="selected-value">Last selected value: {this.state?.lastSelectedValue}</span></> : ""}
                    {this.state?.searchResults?.length > 0 ?
                        <div className="suggestions">
                            {this.showSuggestions()}
                        </div>
                        : ""
                    }
                </div>
            </>
        )
    }
}