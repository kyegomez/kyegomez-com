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
      <div className="terminal-window">
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
    );
  }

  if (error) {
    return (
      <div className="terminal-window">
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
    );
  }

  return (
    <div className="terminal-window">
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
            <a href={repo.html_url} key={repo.id} target="_blank" rel="noopener noreferrer" className="cyber-card repo-card">
              <h2 className="repo-name">{repo.name}</h2>
              <p className="repo-description">{repo.description || 'No description provided.'}</p>
              <div className="repo-stats">
                <span>⭐ {repo.stargazers_count}</span>
                <span>🍴 {repo.forks_count}</span>
                {repo.language && <span>💻 {repo.language}</span>}
                <span>Updated: {new Date(repo.updated_at).toLocaleDateString()}</span>
              </div>
            </a>
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
  );
} 