interface PageFilters {
    page?: number,
    perPage?: number,
    sortBy?: string
}

enum QueryType {
    Tournament = 0,
    TournamentList = 1,
    Event = 2
}




class GraphQLQuery {

    public readonly name: string
    public readonly dataType: string
    public readonly query: QueryType
    public mainFilter: Record<string, string|number>
    public pageFilters?: PageFilters
    public information?: Record<string, string>

    constructor(name: string, dataType: string, query: QueryType, mainFilters: Record<string, string|number>, pageFilters?: PageFilters, information?: Record<string, string>){
        this.name = name;
        this.dataType = dataType;
        this.mainFilter = mainFilters;
        this.pageFilters = pageFilters;
        this.query = query;
        this.information = information;
    }

    public addMainFilter(filterName: Record<string, string|number>): void
    public addMainFilter(filterName: string, filterValue: string|number): void
    public addMainFilter(filterNameOrObject: string|Record<string, string|number>, filterValue?: string|number): void {
        if (typeof(filterNameOrObject) === 'string') {
            this.mainFilter[filterNameOrObject] = filterValue;
            return
        }

        this.mainFilter = Object.assign({}, this.mainFilter, filterNameOrObject);
    }

    public addPageFilter(filterName: string, filterValue: string|number) {
        this.pageFilters[filterName] = filterValue;
    }

    private convertFilterToString() {

    }

    public constructRequestBody() {

        const variables = Object.assign({}, this.mainFilter, this.pageFilters);
        const flatVariables = flattenObject(variables);


    }



}

function flattenObject<T extends Object>(obj: T): Object {
    let returnObj: Record<string, any> = {}
    for (const param in obj) {
        const value = obj[param];
        if (typeof(value) === 'object' && !(value instanceof Date)){
            const flattenedParams = flattenObject(value);
            returnObj = Object.assign({}, returnObj, flattenedParams)
            continue
        }
        returnObj[param] = value;
    }
    return returnObj
}
