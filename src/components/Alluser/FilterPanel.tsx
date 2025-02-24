import { X } from "lucide-react";
import { Badge } from "../ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "../ui/select";
import { Button } from "../ui/button";

  // components/FilterPanel.tsx
  interface FilterPanelProps {
    show: boolean;
    filters: FilterOptions;
    setFilters: (filters: FilterOptions) => void;
    users: UserInfo[];
  }
  
  const FilterPanel = ({ show, filters, setFilters, users }: FilterPanelProps) => {
    const filterOptions = {
      colleges: Array.from(new Set(users.map(user => user.college))),
      courses: Array.from(new Set(users.map(user => user.course).filter(Boolean))),
      yearOfStudy: ['1st Year', '2nd Year', '3rd Year', '4th Year'],
      departments: Array.from(new Set(users.map(user => user.department).filter(Boolean)))
    };
  
    const clearFilters = () => {
      setFilters({
        college: '',
        course: '',
        yearOfStudy: '',
        department: ''
      });
    };
  
    if (!show) return null;
  
    return (
      <div className="space-y-4 p-4 bg-gray-50 rounded-lg border border-gray-100">
        <div className="flex items-center justify-between">
          <h3 className="font-medium text-gray-900">Filters</h3>
          <Button
            variant="ghost"
            size="sm"
            onClick={clearFilters}
            className="text-gray-500 hover:text-gray-700"
          >
            Clear all
            <X className="ml-2 h-4 w-4" />
          </Button>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <Select
            value={filters.college}
            onValueChange={(value) => setFilters({ ...filters, college: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select College" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Colleges</SelectItem>
              {filterOptions.colleges.map((college) => (
                <SelectItem key={college} value={college}>
                  {college}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
  
          <Select
            value={filters.course}
            onValueChange={(value) => setFilters({ ...filters, course: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Course" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Courses</SelectItem>
              {filterOptions.courses.map((course) => (
                <SelectItem key={course} value={course}>
                  {course}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
  
          <Select
            value={filters.yearOfStudy}
            onValueChange={(value) => setFilters({ ...filters, yearOfStudy: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Year of Study" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Years</SelectItem>
              {filterOptions.yearOfStudy.map((year) => (
                <SelectItem key={year} value={year}>
                  {year}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
  
          <Select
            value={filters.department}
            onValueChange={(value) => setFilters({ ...filters, department: value })}
          >
            <SelectTrigger>
              <SelectValue placeholder="Select Department" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="">All Departments</SelectItem>
              {filterOptions.departments.map((dept) => (
                <SelectItem key={dept} value={dept}>
                  {dept}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
  
        {/* Active filters */}
        <div className="flex flex-wrap gap-2">
          {Object.entries(filters).map(([key, value]) => 
            value ? (
              <Badge
                key={key}
                variant="secondary"
                className="px-2 py-1 flex items-center gap-1"
              >
                {value}
                <X
                  className="h-3 w-3 cursor-pointer hover:text-primary"
                  onClick={() => setFilters({ ...filters, [key]: '' })}
                />
              </Badge>
            ) : null
          )}
        </div>
      </div>
    );
  };
  
  export default FilterPanel;