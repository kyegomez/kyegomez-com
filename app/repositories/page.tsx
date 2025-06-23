'use client'

import { useState, useEffect, useMemo } from 'react'

interface Repo {
  id: number;
  name: string;
  html_url: string;
  description: string;
  stargazers_count: number;
  forks_count: number;
  language: string;
  updated_at: string;
}

export default function RepositoriesPage() {
  const [repos, setRepos] = useState<Repo[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchTerm, setSearchTerm] = useState('');
  const [languageFilter, setLanguageFilter] = useState('');
  const [sortBy, setSortBy] = useState<'updated' | 'stars' | 'name'>('updated');
  const [currentPage, setCurrentPage] = useState(1);
  const reposPerPage = 20;

  useEffect(() => {
    async function fetchRepos() {
      try {
        setLoading(true);
        // Fetch all repos (GitHub API allows up to 100 per page, we'll need multiple requests)
        let allRepos: Repo[] = [];
        let page = 1;
        
        while (page <= 4) { // Fetch up to 400 repos (4 pages of 100 each)
          const res = await fetch(`https://api.github.com/users/kyegomez/repos?sort=updated&per_page=100&page=${page}`);
          
          if (!res.ok) {
            throw new Error(`Failed to fetch repos: ${res.status}`);
          }
          
          const pageRepos: Repo[] = await res.json();
          allRepos = [...allRepos, ...pageRepos];
          
          // If we got less than 100 repos, we've reached the end
          if (pageRepos.length < 100) break;
          page++;
        }
        
        setRepos(allRepos);
      } catch (err) {
        console.error("Error fetching repositories:", err);
        setError(err instanceof Error ? err.message : 'Failed to fetch repositories');
      } finally {
        setLoading(false);
      }
    }

    fetchRepos();
  }, []);

  // Get unique languages for filter dropdown
  const languages = useMemo(() => {
    const langSet = new Set(repos.map(repo => repo.language).filter(Boolean));
    return Array.from(langSet).sort();
  }, [repos]);

  // Filter and sort repositories
  const filteredAndSortedRepos = useMemo(() => {
    let filtered = repos.filter(repo => {
      const matchesSearch = repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                           (repo.description && repo.description.toLowerCase().includes(searchTerm.toLowerCase()));
      const matchesLanguage = !languageFilter || repo.language === languageFilter;
      return matchesSearch && matchesLanguage;
    });

    // Sort repositories
    filtered.sort((a, b) => {
      switch (sortBy) {
        case 'stars':
          return b.stargazers_count - a.stargazers_count;
        case 'name':
          return a.name.localeCompare(b.name);
        case 'updated':
        default:
          return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime();
      }
    });

    return filtered;
  }, [repos, searchTerm, languageFilter, sortBy]);

  // Pagination
  const totalPages = Math.ceil(filteredAndSortedRepos.length / reposPerPage);
  const startIndex = (currentPage - 1) * reposPerPage;
  const paginatedRepos = filteredAndSortedRepos.slice(startIndex, startIndex + reposPerPage);

  if (loading) {
    return (
      <div className="flex justify-center items-start pt-2 sm:pt-4">
        <div className="terminal-window max-w-6xl">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button red"></span>
              <span className="terminal-button yellow"></span>
              <span className="terminal-button green"></span>
            </div>
            <div className="terminal-title-text">
              GitHub Repository Database
            </div>
          </div>
          <div className="terminal-body-text">
            <p className="cyber-p">Loading repositories...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-start pt-2 sm:pt-4">
        <div className="terminal-window max-w-6xl">
          <div className="terminal-header">
            <div className="terminal-buttons">
              <span className="terminal-button red"></span>
              <span className="terminal-button yellow"></span>
              <span className="terminal-button green"></span>
            </div>
            <div className="terminal-title-text">
              GitHub Repository Database
            </div>
          </div>
          <div className="terminal-body-text">
            <p className="cyber-p">Error: {error}</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="flex justify-center items-start pt-2 sm:pt-4">
      <div className="terminal-window max-w-6xl">
        <div className="terminal-header">
          <div className="terminal-buttons">
            <span className="terminal-button red"></span>
            <span className="terminal-button yellow"></span>
            <span className="terminal-button green"></span>
          </div>
          <div className="terminal-title-text">
            GitHub Repository Database
          </div>
        </div>
        <div className="terminal-body-text">
          <h1 className="cyber-h1">[kyegomez@kyegomez-os ~]$ ls -l repositories</h1>
          
          {/* Search and Filters */}
          <div className="repo-controls">
            <div className="search-box">
              <input
                type="text"
                placeholder="Search repositories..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="cyber-input"
              />
            </div>
            
            <div className="filter-controls">
              <select
                value={languageFilter}
                onChange={(e) => setLanguageFilter(e.target.value)}
                className="cyber-select"
              >
                <option value="">All Languages</option>
                {languages.map(lang => (
                  <option key={lang} value={lang}>{lang}</option>
                ))}
              </select>
              
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value as 'updated' | 'stars' | 'name')}
                className="cyber-select"
              >
                <option value="updated">Sort by Updated</option>
                <option value="stars">Sort by Stars</option>
                <option value="name">Sort by Name</option>
              </select>
            </div>
          </div>

          <p className="cyber-p">
            Showing {paginatedRepos.length} of {filteredAndSortedRepos.length} repositories 
            {searchTerm && ` matching "${searchTerm}"`}
            {languageFilter && ` in ${languageFilter}`}
          </p>

          {/* Repository List */}
          <div className="repo-list">
            {paginatedRepos.map((repo) => (
              <div key={repo.id} className="cyber-card repo-card">
                <div>
                  <a href={repo.html_url} target="_blank" rel="noopener noreferrer">
                    <h2 className="repo-name hover:text-red-500 transition-colors">{repo.name}</h2>
                  </a>
                  <p className="repo-description">{repo.description || 'No description provided.'}</p>
                </div>
                <div className="repo-stats">
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
                    {repo.stargazers_count}
                  </span>
                  <span>
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" /></svg>
                    {repo.forks_count}
                  </span>
                  {repo.language && (
                    <span>
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M12.316 3.051a1 1 0 01.633 1.265l-4 12a1 1 0 11-1.898-.632l4-12a1 1 0 011.265-.633zM5.707 6.293a1 1 0 010 1.414L3.414 10l2.293 2.293a1 1 0 11-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z" clipRule="evenodd" /></svg>
                      {repo.language}
                    </span>
                  )}
                  <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          {totalPages > 1 && (
            <div className="pagination">
              <button
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPage === 1}
                className="cyber-button"
              >
                Previous
              </button>
              
              <span className="page-info">
                Page {currentPage} of {totalPages}
              </span>
              
              <button
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPage === totalPages}
                className="cyber-button"
              >
                Next
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 