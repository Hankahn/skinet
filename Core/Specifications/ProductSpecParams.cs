namespace Core.Specifications;

public class ProductSpecParams {

    private const int MaxPageSize = 50;

    private List<string> _brands = [];
    private List<string> _types = [];
    private int _pageSize = 6;
    private int _pageIndex = 1;
    private string? _sort;
    private string? _search;

    public int PageIndex {
        get => _pageIndex;
        set => _pageIndex = value;
    }

    public int PageSize {
        get => _pageSize;
        set => _pageSize = (value > MaxPageSize) ? MaxPageSize : value;
    }
    
    public List<string> Brands {
        get => _brands;
        set {
            _brands = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
        }
    }
    
    public List<string> Types {
        get => _types;
        set {
            _types = value.SelectMany(x => x.Split(',', StringSplitOptions.RemoveEmptyEntries)).ToList();
        }
    }

    public string? Sort {
        get => _sort;
        set => _sort = value;
    }

    public string? Search {
        get => _search ?? "";
        set => _search = value.ToLower();
    }

}